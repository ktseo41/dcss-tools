import { calculateEV } from "@/utils/evCalculation";
import { calculateMixedAC } from "@/utils/acCalculation";
import { CalculatorState } from "@/hooks/useCalculatorState";
import { calculateSH } from "./shCalculation";
import {
  calculateSpellFailureRate,
  getSpellData,
  getSpellSchools,
} from "./spellCalculation";
import { GameVersion } from "@/types/game";
import { VersionedSchoolSkillLevels } from "@/types/spells";

type DataPoint = {
  dodgingSkill: number;
  baseEV: number;
  rawDodgeBonus: number;
  actualDodgeBonus: number;
  dodgeModifier: number;
  shieldPenalty: number;
  armourPenalty: number;
  finalEV: number;
};

type ACDataPoint = {
  armour: number;
  ac: number;
};

export const calculateAcData = <V extends GameVersion>(
  state: CalculatorState<V>
): ACDataPoint[] => {
  const result = Array.from({ length: 271 }, (_, i) => i / 10).map(
    (_, index) => {
      const armour = index / 10;

      return {
        armour,
        ac: calculateMixedAC({
          species: state.species,
          armour: state.armour,
          helmet: state.helmet,
          gloves: state.gloves,
          boots: state.boots,
          cloak: state.cloak,
          barding: state.barding,
          secondGloves: state.secondGloves,
          armourSkill: armour,
        }),
      };
    }
  );

  return result;
};

export const calculateEvData = <V extends GameVersion>(
  state: CalculatorState<V>
): DataPoint[] => {
  const result = Array.from({ length: 271 }, (_, i) => i / 10).map(
    (_, index) => {
      const dodgingSkill = index / 10;
      const calcResult = calculateEV({
        version: state.version,
        dodgingSkill,
        dexterity: state.dexterity,
        strength: state.strength,
        species: state.species,
        shield: state.shield,
        armour: state.armour,
        shieldSkill: state.shieldSkill,
        armourSkill: state.armourSkill,
      });

      return {
        dodgingSkill: parseFloat(dodgingSkill.toFixed(1)),
        ...calcResult,
        dodgeModifier: parseFloat(calcResult.dodgeModifier.toFixed(2)),
      };
    }
  );

  return result;
};

export const calculateAcTicks = <V extends GameVersion>(
  state: CalculatorState<V>
): number[] => {
  const acData = calculateAcData(state);
  const acChangePoints = new Set<number>();

  let lastAC = 0;
  for (const dataPoint of acData) {
    if (dataPoint.ac !== lastAC && dataPoint.armour < 27) {
      acChangePoints.add(dataPoint.armour);
      lastAC = dataPoint.ac;
    }
  }

  return Array.from(acChangePoints);
};

export const calculateEvTicks = <V extends GameVersion>(
  state: CalculatorState<V>
): number[] => {
  const evData = calculateEvData(state);
  const evChangePoints = new Set<number>();

  let lastEV = 0;
  for (const dataPoint of evData) {
    if (dataPoint.finalEV !== lastEV && dataPoint.dodgingSkill < 27) {
      evChangePoints.add(dataPoint.dodgingSkill);
      lastEV = dataPoint.finalEV;
    }
  }

  return Array.from(evChangePoints);
};

export type SHDataPoint = {
  shield: number;
  sh: number;
};

export const calculateSHData = <V extends GameVersion>(
  state: CalculatorState<V>
): SHDataPoint[] => {
  const result = Array.from({ length: 271 }, (_, i) => i / 10).map(
    (_, index) => {
      const shield = index / 10;
      return {
        shield,
        sh: calculateSH({
          shield: state.shield,
          shieldSkill: shield,
          dexterity: state.dexterity,
        }),
      };
    }
  );

  return result;
};

export const calculateShTicks = <V extends GameVersion>(
  state: CalculatorState<V>
): number[] => {
  const shData = calculateSHData(state);
  const shChangePoints = new Set<number>();

  let lastSH = 0;
  for (const dataPoint of shData) {
    if (dataPoint.sh !== lastSH && dataPoint.shield < 27) {
      shChangePoints.add(dataPoint.shield);
      lastSH = dataPoint.sh;
    }
  }

  return Array.from(shChangePoints);
};

export type FristSchoolSFDataPoint = {
  spellSkill: number;
  spellFailureRate: number;
};

export const calculateAvgSFData = <V extends GameVersion>(
  state: CalculatorState<V>
): FristSchoolSFDataPoint[] => {
  const targetSpell = state.targetSpell;

  if (targetSpell === undefined) {
    throw new Error("Target spell not found");
  }

  const spellDifficulty = getSpellData<V>(state.version).find(
    (spell) => spell.name === targetSpell
  )?.level;

  if (spellDifficulty === undefined) {
    throw new Error("Spell difficulty not found");
  }

  if (state.targetSpell === undefined) {
    throw new Error("Target spell not found");
  }
  const spellSchools = getSpellSchools<V>(state.version, targetSpell);

  const result = Array.from({ length: 271 }, (_, i) => i / 10).map(
    (_, index) => {
      const schoolSkills = spellSchools.reduce((acc, school) => {
        acc[school] = index / 10;

        return acc;
      }, {} as VersionedSchoolSkillLevels<V>);

      const spellFailureRate = calculateSpellFailureRate({
        version: state.version,
        species: state.species,
        strength: state.strength,
        intelligence: state.intelligence,
        spellcasting: state.spellcasting ?? 0,
        targetSpell: targetSpell,
        schoolSkills: schoolSkills,
        spellDifficulty,
        armour: state.armour,
        shield: state.shield,
        armourSkill: state.armourSkill,
        shieldSkill: state.shieldSkill,
        wizardry: state.wizardry,
        channel: state.channel,
        wildMagic: state.wildMagic,
      });

      return {
        spellSkill: index / 10,
        spellFailureRate,
      };
    }
  );

  return result;
};

export const calculateSFTicks = <V extends GameVersion>(
  state: CalculatorState<V>
): number[] => {
  const sfData = calculateAvgSFData<V>(state);
  const sfChangePoints = new Set<number>();

  const fibo = [1, 2, 3, 5, 8, 13, 21];
  let lastSpellFailureRate = 0;
  for (const dataPoint of sfData) {
    if (
      dataPoint.spellFailureRate <= 34 &&
      dataPoint.spellSkill < 27 &&
      fibo.includes(dataPoint.spellFailureRate)
    ) {
      if (dataPoint.spellFailureRate !== lastSpellFailureRate) {
        sfChangePoints.add(dataPoint.spellSkill);
        lastSpellFailureRate = dataPoint.spellFailureRate;
      }
    }
  }

  return Array.from(sfChangePoints);
};

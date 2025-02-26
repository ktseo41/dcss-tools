import { describe, expect, test } from "@jest/globals";
import { calculateSpellFailureRate } from "../spellCalculation";

describe("Spell Calculations", () => {
  test("robe, low level, stat, 4 level conj/alchemy spell (Fullminant Prism)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "human",
      strength: 4,
      spellcasting: 4.5,
      intelligence: 25,
      targetSpell: "Fulminant Prism",
      schoolSkills: {
        conjuration: 5.3,
        alchemy: 0,
      },
      spellDifficulty: 4,
      armour: "robe",
      shield: "none",
      armourSkill: 0,
      shieldSkill: 0,
    });

    expect(failureRate).toBe(28);
  });

  test("robe, low level, stat, 4 level conj/alchemy spell (Fullminant Prism) - 2", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "human",
      strength: 4,
      spellcasting: 4.8,
      intelligence: 25,
      targetSpell: "Fulminant Prism",
      schoolSkills: {
        conjuration: 5.4,
        alchemy: 0.8,
      },
      spellDifficulty: 4,
      armour: "robe",
      shield: "none",
      armourSkill: 0,
      shieldSkill: 0,
    });

    expect(failureRate).toBe(24);
  });

  test("robe, low level, stat, 4 level conj/alchemy spell (Fullminant Prism) - 3", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "human",
      strength: 4,
      spellcasting: 6.2,
      intelligence: 31,
      targetSpell: "Fulminant Prism",
      schoolSkills: {
        conjuration: 6.3,
        alchemy: 3.2,
      },
      spellDifficulty: 4,
      armour: "robe",
      shield: "none",
      armourSkill: 0,
      shieldSkill: 0,
    });

    expect(failureRate).toBe(7);
  });

  test("robe, low level, stat, 4 level conj/alchemy spell (Fullminant Prism) - 4", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "human",
      strength: 4,
      spellcasting: 9.2,
      intelligence: 32,
      targetSpell: "Fulminant Prism",
      schoolSkills: {
        conjuration: 7.2,
        alchemy: 4.3,
      },
      spellDifficulty: 4,
      armour: "robe",
      shield: "none",
      armourSkill: 0,
      shieldSkill: 0,
    });

    expect(failureRate).toBe(3);
  });

  test("leather armour, 4 level conj/alchemy spell (Fullminant Prism)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "human",
      strength: 4,
      spellcasting: 9.2,
      intelligence: 32,
      targetSpell: "Fulminant Prism",
      schoolSkills: {
        conjuration: 7.2,
        alchemy: 4.3,
      },
      spellDifficulty: 4,
      armour: "leather_armour",
      shield: "none",
      armourSkill: 0,
      shieldSkill: 0,
    });

    expect(failureRate).toBe(5);
  });

  test("chain mail, 4 level conj/alchemy spell (Fullminant Prism)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "human",
      strength: 4,
      spellcasting: 9.2,
      intelligence: 32,
      targetSpell: "Fulminant Prism",
      schoolSkills: {
        conjuration: 7.2,
        alchemy: 4.3,
      },
      spellDifficulty: 4,
      armour: "chain_mail",
      shield: "none",
      armourSkill: 0,
      shieldSkill: 0,
    });

    expect(failureRate).toBe(100);
  });

  test("ring mail, 4 level conj/alchemy spell (Fullminant Prism)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "human",
      strength: 4,
      spellcasting: 9.2,
      intelligence: 32,
      targetSpell: "Fulminant Prism",
      schoolSkills: {
        conjuration: 7.2,
        alchemy: 4.3,
      },
      spellDifficulty: 4,
      armour: "ring_mail",
      shield: "none",
      armourSkill: 0,
      shieldSkill: 0,
    });

    expect(failureRate).toBe(19);
  });

  test("robe, 4 level conj/alchemy spell (Fullminant Prism)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "human",
      strength: 4,
      spellcasting: 10.3,
      intelligence: 34,
      targetSpell: "Fulminant Prism",
      schoolSkills: {
        conjuration: 8,
        alchemy: 5,
      },
      spellDifficulty: 4,
      armour: "robe",
      shield: "none",
      armourSkill: 0,
      shieldSkill: 0,
    });

    expect(failureRate).toBe(1);
  });

  // https://archive.nemelex.cards/morgue/caiman/morgue-caiman-20250131-054317.txt
  test("leather armour, 3 level hex/fire spell (Dazzling Flash)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "human",
      strength: 13,
      spellcasting: 7,
      intelligence: 13,
      targetSpell: "Dazzling Flash",
      schoolSkills: {
        hexes: 8,
        fire: 4,
      },
      spellDifficulty: 3,
      armour: "leather_armour",
      shield: "none",
      armourSkill: 9,
      shieldSkill: 0,
    });

    expect(failureRate).toBe(4);
  });

  // https://archive.nemelex.cards/morgue/caiman/morgue-caiman-20250126-091458.txt
  test("storm dragon scales, kite shield, 4 level tloc/air spell (Vhi's Electric Charge)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "human",
      strength: 41,
      spellcasting: 15,
      intelligence: 9,
      targetSpell: "Vhi's Electric Charge",
      schoolSkills: {
        translocation: 14,
        air: 6,
      },
      spellDifficulty: 4,
      armour: "storm_dragon",
      shield: "kite_shield",
      armourSkill: 15,
      shieldSkill: 18,
    });

    expect(failureRate).toBe(4);
  });

  // https://crawl.akrasiac.org/rawdata/hammy3456/morgue-hammy3456-20250206-022444.txt ==> 0.27 버전이었음
  // WIZARD 모드로 실행하니 다른 수치가 나와서 고침..
  test("tower shield, 5 level hex/air spell (silence)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "human",
      strength: 12,
      spellcasting: 14,
      intelligence: 25,
      targetSpell: "Silence",
      schoolSkills: {
        hexes: 8,
        air: 9,
      },
      spellDifficulty: 5,
      armour: "robe",
      shield: "tower_shield",
      armourSkill: 0,
      shieldSkill: 24.6,
    });

    expect(failureRate).toBe(3);
  });

  // deprecated Spell
  // test("tower shield, 6 level conj/erth spell (Iron Shot) - same case as above", () => {
  //   const failureRate = calculateSpellFailureRate({
  //     strength: 12,
  //     spellcasting: 14,
  //     intelligence: 25,
  //     targetSpell: "Iron Shot",
  //     schoolSkills: {
  //       Conjuration: 14,
  //       Earth: 13,
  //     },
  //     spellDifficulty: 6,
  //     armour: "robe",
  //     shield: "tower_shield",
  //     armourSkill: 0,
  //     shieldSkill: 24.6,
  //   });

  //   expect(failureRate).toBe(2);
  // });

  test("tower shield, 2 level conj/air spell (static discharge) - same case as above", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "human",
      strength: 12,
      spellcasting: 14,
      intelligence: 25,
      targetSpell: "Static Discharge",
      schoolSkills: {
        conjuration: 14,
        air: 9,
      },
      spellDifficulty: 2,
      armour: "robe",
      shield: "tower_shield",
      armourSkill: 0,
      shieldSkill: 24.6,
    });

    expect(failureRate).toBe(1);
  });

  // https://cbro.berotato.org/morgue/mroovka/morgue-mroovka-20250207-023701.txt
  test("tower shield, 8 level conj/alchemy spell (Fulsome Fusillade)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "trunk",
      species: "human",
      strength: 29,
      spellcasting: 16,
      intelligence: 43,
      targetSpell: "Fulsome Fusillade",
      schoolSkills: {
        conjuration: 20,
        alchemy: 19,
      },
      spellDifficulty: 8,
      armour: "robe",
      shield: "tower_shield",
      armourSkill: 0,
      shieldSkill: 15.2,
    });

    expect(failureRate).toBe(3);
  });

  // https://underhound.eu/crawl/morgue/SayItsName/morgue-SayItsName-20250205-225207.txt
  test("buckler, 8 level conj/earth spell (Lehudib's Crystal Spear)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "trunk",
      species: "human",
      strength: 8,
      spellcasting: 23.3,
      intelligence: 34,
      targetSpell: "Lehudib's Crystal Spear",
      schoolSkills: {
        conjuration: 14.3,
        earth: 25.8,
      },
      spellDifficulty: 8,
      armour: "robe",
      shield: "buckler",
      armourSkill: 0,
      shieldSkill: 19,
    });

    expect(failureRate).toBe(1);
  });

  // https://crawl.dcss.io/crawl/morgue/AintCerebovvered/morgue-AintCerebovvered-20250204-194125.txt
  test("tower shield, 9 level conj/air spell (Chain Lightning)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "trunk",
      species: "human",
      strength: 18,
      spellcasting: 27,
      intelligence: 10,
      targetSpell: "Chain Lightning",
      schoolSkills: {
        conjuration: 26.5,
        air: 27,
      },
      spellDifficulty: 9,
      armour: "robe",
      shield: "tower_shield",
      armourSkill: 0,
      shieldSkill: 27,
    });

    expect(failureRate).toBe(4);
  });

  // https://crawl.dcss.io/crawl/morgue/slifty/morgue-slifty-20250201-052559.txt
  test("kite shield, leather armour, 4 level tloc/air spell (Vhi's Electric Charge)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "human",
      strength: 14,
      spellcasting: 10,
      intelligence: 14,
      targetSpell: "Vhi's Electric Charge",
      schoolSkills: {
        translocation: 10,
        air: 5,
      },
      spellDifficulty: 4,
      armour: "leather_armour",
      shield: "kite_shield",
      armourSkill: 24,
      shieldSkill: 21,
    });

    expect(failureRate).toBe(7);
  });

  // https://cbro.berotato.org/morgue/slitherrr/morgue-slitherrr-20250130-190843.txt
  test("naga, tower shield, pearl dragon scales, barding, 7 level ice/necr spell (Rimeblight)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "naga",
      strength: 34,
      spellcasting: 20.3,
      intelligence: 49,
      targetSpell: "Rimeblight",
      schoolSkills: {
        ice: 27,
        necromancy: 12,
      },
      spellDifficulty: 7,
      armour: "pearl_dragon",
      shield: "tower_shield",
      armourSkill: 18,
      shieldSkill: 27,
    });

    expect(failureRate).toBe(1);
  });

  // https://crawl.akrasiac.org/rawdata/modargo/morgue-modargo-20250114-190932.txt
  test("naga, tower shield, robe, barding, 9 level Conj/Air spell (Chain Lightning)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "trunk",
      species: "naga",
      strength: 17,
      spellcasting: 15,
      intelligence: 23,
      targetSpell: "Chain Lightning",
      schoolSkills: {
        conjuration: 24.1,
        air: 25,
      },
      spellDifficulty: 9,
      armour: "robe",
      shield: "tower_shield",
      armourSkill: 8,
      shieldSkill: 22.8,
    });

    expect(failureRate).toBe(22);
  });

  // https://crawl.akrasiac.org/rawdata/backstreet/morgue-backstreet-20241227-085307.txt
  test("naga, kite shield, plate armour, barding, 4 level Tloc/Air spell (Vhi's Electric Charge)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "naga",
      strength: 21,
      spellcasting: 18,
      intelligence: 51,
      targetSpell: "Vhi's Electric Charge",
      schoolSkills: {
        translocation: 8,
        air: 8,
      },
      spellDifficulty: 4,
      armour: "plate",
      shield: "kite_shield",
      armourSkill: 15,
      shieldSkill: 15,
    });

    expect(failureRate).toBe(2);
  });

  // https://crawl.akrasiac.org/rawdata/DarkXAngel/morgue-DarkXAngel-20240926-042247.txt
  test("naga, tower shield, ring mail, barding, 6 level Alch spell (Eringya's Noxious Bog)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "naga",
      strength: 12,
      spellcasting: 16,
      intelligence: 52,
      targetSpell: "Eringya's Noxious Bog",
      schoolSkills: {
        alchemy: 10,
      },
      spellDifficulty: 6,
      armour: "ring_mail",
      shield: "tower_shield",
      armourSkill: 5,
      shieldSkill: 16,
    });

    expect(failureRate).toBe(9);
  });

  // 개인 플레이 도중
  test("deep elf, steam dragon scales, buckler, 4 level Summoning/Air spell (Summon Lightning Spire)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "deepElf",
      strength: 4,
      spellcasting: 18,
      intelligence: 29,
      targetSpell: "Summon Lightning Spire",
      schoolSkills: {
        summoning: 3,
        air: 4,
      },
      spellDifficulty: 4,
      armour: "steam_dragon",
      shield: "buckler",
      armourSkill: 0,
      shieldSkill: 4.7,
      wizardry: 1,
    });

    expect(failureRate).toBe(2);
  });

  // WIZ 모드 테스트
  test("white draconian, tower shield, 8 level Conj/Earth spell (Lehudib's Crystal Spear)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "draconian",
      strength: 12,
      spellcasting: 14,
      intelligence: 25,
      targetSpell: "Lehudib's Crystal Spear",
      schoolSkills: {
        conjuration: 14,
        earth: 13,
      },
      spellDifficulty: 8,
      armour: "robe",
      shield: "tower_shield",
      armourSkill: 0,
      shieldSkill: 24.6,
      wizardry: 2,
    });

    expect(failureRate).toBe(28);
  });

  // 개인 플레이 도중
  test("deep elf, robe, wucad mu, 7 level Fire/Earth spell (Hellfire Mortar)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "deepElf",
      strength: 6,
      spellcasting: 23.7,
      intelligence: 33,
      targetSpell: "Hellfire Mortar",
      schoolSkills: {
        fire: 3,
        earth: 11,
      },
      spellDifficulty: 7,
      armour: "robe",
      shield: "none",
      armourSkill: 0,
      shieldSkill: 5,
      wizardry: 1,
      channel: true,
    });

    expect(failureRate).toBe(26);
  });

  // 개인 플레이 도중, 그래프에 10이라고 나와서 테스트
  test("formicid, leather armour, kite shield, 4 level Hex/Tloc spell (Dimensional Bullseye)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "formicid",
      strength: 26,
      spellcasting: 5,
      intelligence: 28,
      targetSpell: "Dimensional Bullseye",
      schoolSkills: {
        hexes: 9,
        translocation: 4.7,
      },
      spellDifficulty: 4,
      armour: "leather_armour",
      shield: "kite_shield",
      armourSkill: 0,
      shieldSkill: 4,
    });

    expect(failureRate).toBe(9);
  });

  // 개인 플레이 도중
  test("formicid, leather armour, kite shield, wild magic 1, 4 level Hex/Tloc spell (Dimensional Bullseye)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "formicid",
      strength: 27,
      spellcasting: 5,
      intelligence: 29,
      targetSpell: "Dimensional Bullseye",
      schoolSkills: {
        hexes: 9.2,
        translocation: 5.1,
      },
      spellDifficulty: 4,
      armour: "leather_armour",
      shield: "kite_shield",
      armourSkill: 0,
      shieldSkill: 4,
      wildMagic: 1,
    });

    expect(failureRate).toBe(12);
  });

  // 개인 플레이 도중
  test("formicid, leather armour, tower shield, 9 level Ice spell (Polar Vortex)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "0.32",
      species: "formicid",
      strength: 29,
      spellcasting: 13,
      intelligence: 34,
      targetSpell: "Polar Vortex",
      schoolSkills: {
        ice: 22.7,
      },
      spellDifficulty: 9,
      armour: "leather_armour",
      shield: "tower_shield",
      armourSkill: 10,
      shieldSkill: 25.6,
    });

    expect(failureRate).toBe(21); // 게임 화면상으로는 21
  });

  // https://crawl.akrasiac.org/rawdata/acky8/morgue-acky8-20250214-182911.txt
  test("9 - mountain dwarf, tower shield, scale mail, str 30, dex 12, int 18, armour skill 19.4, shields skill 23.3, spellcasting 0, air 8.0, 3 level Air spell (Swiftness)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "trunk",
      species: "mountainDwarf",
      armour: "scale_mail",
      armourSkill: 19.4,
      intelligence: 18,
      strength: 30,
      shield: "tower_shield",
      shieldSkill: 23.3,
      spellcasting: 0,
      schoolSkills: {
        air: 8.0,
      },
      spellDifficulty: 3,
      targetSpell: "Swiftness",
    });

    expect(failureRate).toBe(3);
  });

  // https://crawl.akrasiac.org/rawdata/KarmaDistortion/morgue-KarmaDistortion-20250214-104740.txt
  test("9 - mountain dwarf, kite shield, pearl dragon scales, str 31, dex 16, int 27, armour skill 22, shields skill 18, spellcasting 14, conj 16, fire 24.5, 9 level Conj/Fire spell (Fire Storm), wild magic 1, 77%", () => {
    const failureRate = calculateSpellFailureRate({
      version: "trunk",
      species: "mountainDwarf",
      armour: "pearl_dragon",
      armourSkill: 22,
      intelligence: 27,
      strength: 31,
      shield: "kite_shield",
      shieldSkill: 18,
      spellcasting: 14,
      schoolSkills: {
        conjuration: 16,
        fire: 24.5,
      },
      spellDifficulty: 9,
      targetSpell: "Fire Storm",
      wildMagic: 1,
    });

    expect(failureRate).toBe(77);
  });

  // 위의 테스트 케이스와 동일한 테스트
  test("9 - mountain dwarf, kite shield, pearl dragon scales, str 31, dex 16, int 27, armour skill 22, shields skill 18, spellcasting 14, conj 16, fire 24.5, 8 level Fire spell (Ignition), wild magic 1, 2%", () => {
    const failureRate = calculateSpellFailureRate({
      version: "trunk",
      species: "mountainDwarf",
      armour: "pearl_dragon",
      armourSkill: 22,
      intelligence: 27,
      strength: 31,
      shield: "kite_shield",
      shieldSkill: 18,
      spellcasting: 14,
      schoolSkills: {
        fire: 24.5,
      },
      spellDifficulty: 8,
      targetSpell: "Ignition",
      wildMagic: 1,
    });

    expect(failureRate).toBe(2);
  });

  // Revenant Enkindle 테스트 (로컬 실행) - 1
  test("Revenant, scale mail, buckler, str 19, int 7, armour 2.6, shield 2.6, splcasting 0, ice 0, 1 level Ice spell (Freeze)", () => {
    const failureRate = calculateSpellFailureRate({
      version: "trunk",
      species: "revenant",
      armour: "scale_mail",
      armourSkill: 2.6,
      intelligence: 7,
      strength: 19,
      shield: "buckler",
      shieldSkill: 2.6,
      spellcasting: 0,
      schoolSkills: {
        ice: 0,
      },
      spellDifficulty: 1,
      targetSpell: "Freeze",
      enkindle: true,
    });

    expect(failureRate).toBe(12);
  });

  // Revenant Enkindle 테스트 (로컬 실행) - 1
  test("Revenant, quicksilver dragon scale, str 19, int 14, armour 2.6, shield 2.6, splcasting 8, fire 7, earth 8, forgecraft 9, 7 level Fire/Earth/Forge spell (Hellfire Mortar), 73%", () => {
    const failureRate = calculateSpellFailureRate({
      version: "trunk",
      species: "revenant",
      armour: "quicksilver_dragon",
      armourSkill: 2.6,
      intelligence: 14,
      strength: 19,
      shield: "none",
      shieldSkill: 0,
      spellcasting: 8,
      schoolSkills: {
        fire: 7,
        earth: 8,
        forgecraft: 9,
      },
      spellDifficulty: 7,
      targetSpell: "Hellfire Mortar",
      enkindle: true,
    });

    expect(failureRate).toBe(73);
  });
});

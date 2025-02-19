import { describe, expect, test } from "@jest/globals";
import { calculateEV } from "../evCalculation";

describe("EV Calculations", () => {
  test("기본 EV 계산 (중간 크기 종족)", () => {
    const result = calculateEV({
      version: "0.32",
      dodgingSkill: 0,
      dexterity: 10,
      strength: 10,
      species: "human",
      shield: "none",
      armour: "robe",
      shieldSkill: 0,
      armourSkill: 0,
    });

    expect(result.baseEV).toBe(10);
    expect(result.finalEV).toBe(10);
  });

  test("1 - 코글린, str 13, dex 25, no shield, armour er 0, dodge skill 20.5", () => {
    const result = calculateEV({
      version: "0.32",
      dodgingSkill: 20.5,
      dexterity: 25,
      strength: 13,
      species: "coglin",
      shield: "none",
      armour: "robe",
      shieldSkill: 0,
      armourSkill: 0,
    });

    expect(result.finalEV).toBe(30);
  });

  test("2 - 코글린, str 10, dex 22, no shield, armour er 0, dodge skill 16.7", () => {
    const result = calculateEV({
      version: "0.32",
      dodgingSkill: 16.7,
      dexterity: 22,
      strength: 10,
      species: "coglin",
      shield: "none",
      armour: "robe",
      shieldSkill: 0,
      armourSkill: 0,
    });

    expect(result.finalEV).toBe(25);
  });

  test("3 - formicid, str 21, dex 19, tower shield, armour er 5, dodge skill 9, armour skill 8, shields skill 13", () => {
    const result = calculateEV({
      version: "0.32",
      dodgingSkill: 9,
      dexterity: 19,
      strength: 21,
      species: "formicid",
      shield: "tower_shield",
      armour: "acid_dragon",
      shieldSkill: 13,
      armourSkill: 8,
    });

    expect(result.finalEV).toBe(14);
  });

  test("4 - coglin, str 11, dex 17, armour er 5, dodge skill 4, armour skill 3", () => {
    const result = calculateEV({
      version: "0.32",
      dodgingSkill: 4,
      dexterity: 17,
      strength: 11,
      species: "coglin",
      shield: "none",
      armour: "acid_dragon",
      shieldSkill: 0,
      armourSkill: 3,
    });

    expect(result.finalEV).toBe(12);
  });

  test("5 - coglin, str 11, dex 13, armour er 4, dodge skill 1.8, armour skill 0.8", () => {
    const result = calculateEV({
      version: "0.32",
      dodgingSkill: 1.8,
      dexterity: 13,
      strength: 11,
      species: "coglin",
      shield: "none",
      armour: "leather_armour",
      shieldSkill: 0,
      armourSkill: 0.8,
    });

    expect(result.finalEV).toBe(10);
  });

  test("6 - minotaur, str 27, dex 12, tower shield, armour er 23, dodge skill 4.3, armour skill 15.2, shields skill 20.4", () => {
    const result = calculateEV({
      version: "0.32",
      dodgingSkill: 4.3,
      dexterity: 12,
      strength: 27,
      species: "minotaur",
      shield: "tower_shield",
      armour: "golden_dragon",
      shieldSkill: 20.4,
      armourSkill: 15.2,
    });

    expect(result.finalEV).toBe(6);
  });

  test("7 - oni, str 40, dex 28, kite shield, armour er 0, dodge skill 15.7, armour skill 4.8, shields skill 10.3", () => {
    const result = calculateEV({
      version: "0.32",
      dodgingSkill: 15.7,
      dexterity: 28,
      strength: 40,
      species: "oni",
      shield: "kite_shield",
      armour: "robe",
      shieldSkill: 10.3,
      armourSkill: 4.8,
    });

    expect(result.finalEV).toBe(23);
  });

  test("8 - oni, str 24, dex 15, tower shield, armour er 23, dodge skill 16.1, armour skill 15.9, shields skill 23.4", () => {
    const result = calculateEV({
      version: "0.32",
      dodgingSkill: 16.1,
      dexterity: 15,
      strength: 24,
      species: "oni",
      shield: "tower_shield",
      armour: "golden_dragon",
      shieldSkill: 23.4,
      armourSkill: 15.9,
    });

    expect(result.finalEV).toBe(7);
  });

  // https://crawl.akrasiac.org/rawdata/acky8/morgue-acky8-20250214-182911.txt
  test("9 - mountain dwarf, tower shield, scale mail, str 30, dex 12, armour skill 19.4, dodge skill 14.8, shields skill 23.3, bonus ev 4", () => {
    const result = calculateEV({
      version: "0.32",
      species: "mountainDwarf",
      armour: "scale_mail",
      armourSkill: 19.4,
      dodgingSkill: 14.8,
      dexterity: 12,
      strength: 30,
      shield: "tower_shield",
      shieldSkill: 23.3,
    });

    expect(result.finalEV).toBe(15);
  });
});

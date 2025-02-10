import * as fs from "fs";

type SpellData_PROTO = {
  id: string;
  name: string;
  schools: string[];
  flags: string[];
  level: number;
  power: number;
  range: {
    min: number;
    max: number;
  };
  noise: number;
  tile: string;
};

const wandSpells = {
  WAND_FLAME: "SPELL_THROW_FLAME",
  WAND_PARALYSIS: "SPELL_PARALYSE",
  WAND_DIGGING: "SPELL_DIG",
  WAND_ICEBLAST: "SPELL_ICEBLAST",
  WAND_POLYMORPH: "SPELL_POLYMORPH",
  WAND_CHARMING: "SPELL_CHARMING",
  WAND_ACID: "SPELL_CORROSIVE_BOLT",
  WAND_LIGHT: "SPELL_BOLT_OF_LIGHT",
  WAND_QUICKSILVER: "SPELL_QUICKSILVER_BOLT",
  WAND_MINDBURST: "SPELL_MINDBURST",
  WAND_ROOTS: "SPELL_FASTROOT",
  WAND_WARPING: "SPELL_WARP_SPACE",
}

const playerNonbookSpells = [
  "SPELL_THUNDERBOLT",  
  "SPELL_PHANTOM_MIRROR",
  "SPELL_TREMORSTONE",
  "SPELL_GRAVITAS",
  "SPELL_SONIC_WAVE",
  "SPELL_SMITING",
  "SPELL_UNLEASH_DESTRUCTION",
  "SPELL_HURL_TORCHLIGHT",
  "SPELL_HURL_DAMNATION",
  "SPELL_NOXIOUS_BREATH",
  "SPELL_COMBUSTION_BREATH",
  "SPELL_GLACIAL_BREATH",
  "SPELL_NULLIFYING_BREATH",
  "SPELL_STEAM_BREATH",
  "SPELL_CAUSTIC_BREATH",
  "SPELL_GALVANIC_BREATH",
  "SPELL_MUD_BREATH",
]

const extractSpellData = (fileContent: string) => {
  try {
    // 시작 부분을 찾을 때 더 유연하게 검색
    const startMarker = "spelldata[] =";
    const endMarker = "#if TAG_MAJOR_VERSION == 34";

    const dataStart = fileContent.indexOf(startMarker);
    const dataEnd = fileContent.indexOf(endMarker);

    if (dataStart === -1) {
      throw new Error(
        `Spell data section not found. File content starts with: ${fileContent.substring(
          0,
          100
        )}`
      );
    }

    // 중괄호 매칭을 통해 전체 배열 내용을 추출
    let braceCount = 0;
    const startIndex = fileContent.indexOf("{", dataStart);
    let currentIndex = startIndex;

    do {
      if (fileContent[currentIndex] === "{") {
        braceCount++;
      } else if (fileContent[currentIndex] === "}") {
        braceCount--;
      }
      currentIndex++;
    } while (
      braceCount > 0 &&
      currentIndex < (dataEnd === -1 ? fileContent.length : dataEnd)
    );

    // 전체 spell 데이터 섹션을 추출
    const spellDataSection = fileContent.substring(startIndex, currentIndex);

    return spellDataSection;
  } catch (error) {
    console.error("Error extracting spell data:", error);
    throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있게 함
  }
}

export const parseSpellBlock = (spellBlock: string): SpellData_PROTO | undefined => {
    // AXED_SPELL 체크
    if (spellBlock.includes("AXED_SPELL")) {
      return; // skip this iteration
    }

    try {
      // 중괄호와 앞뒤 공백 제거
      const cleanBlock = spellBlock.replace(/^{\s*|\s*}$/g, "");
      // 각 줄을 배열로 분리
      const lines = cleanBlock.split(",").map((line) => line.trim());

      if (lines.length < 9) return; // 유효하지 않은 데이터는 건너뛰기

      const spell = {
        id: lines[0].trim(),
        name: extractSpellName(lines[1]),
        schools: parseSchools(lines[2]),
        flags: parseFlags(lines[3]),
        level: parseInt(lines[4]) || 0,
        power: parseInt(lines[5]) || 0,
        range: {
          min: parseInt(lines[6]) || -1,
          max: parseInt(lines[7]) || -1,
        },
        noise: parseInt(lines[8]) || 0,
        tile: lines[9] ? lines[9].trim() : "",
      };

      return spell;
    } catch (error) {
      console.error("Error parsing spell block:", spellBlock, error);
    }
}

const parseSpellData = (spellDataSection: string) => {
  const spells: [] = [];
  // 각각의 spell 블록을 매칭하는 정규식
  const spellRegex = /{\s*SPELL_[^}]+}/g;

  const matches = spellDataSection.match(spellRegex);
  if (!matches) return spells;

  const result = matches.map(parseSpellBlock).filter(p => p !== undefined);

  return result;
}

const extractSpellName = (nameStr: string) => {
  const matches = nameStr.match(/"([^"]+)"/);
  return matches ? matches[1] : nameStr.trim();
}

const parseSchools = (schoolsStr: string) => {
  if (!schoolsStr) return [];
  return schoolsStr
    .split("|")
    .map((s) => s.trim().replace("spschool::", ""))
    .filter((s) => s !== "none");
}

const parseFlags = (flagsStr: string) => {
  if (!flagsStr) return [];
  return flagsStr
    .split("|")
    .map((f) => f.trim().replace("spflag::", ""))
    .filter((f) => f !== "none");
}

const extractSets = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const spells = JSON.parse(fileContent);
  const uniqueNames = new Set<string>();
  const uniqueSchools = new Set<string>();
  const uniqueFlags = new Set<string>();

  spells.forEach((spell: SpellData_PROTO) => {
    uniqueNames.add(spell.name);
    spell.schools.forEach((school) => uniqueSchools.add(school));
    spell.flags.forEach((flag) => uniqueFlags.add(flag));
  });

  if (uniqueNames.size === 0) {
    throw new Error("No unique names found");
  }

  if (uniqueSchools.size === 0) {
    throw new Error("No unique schools found");
  }

  if (uniqueFlags.size === 0) {
    throw new Error("No unique flags found");
  }

  return {
    uniqueNames,
    uniqueSchools,
    uniqueFlags,
  };
}

const makeTypeDefinition = (sets: {
  uniqueNames: Set<string>;
  uniqueSchools: Set<string>;
  uniqueFlags: Set<string>;
}) => {
  const names = Array.from(sets.uniqueNames);
  const schools = Array.from(sets.uniqueSchools).map(school => school.replace(/(\r\n|\n|\r)/gm, "").trim());
  const flags = Array.from(sets.uniqueFlags).map(flag => flag.replace(/(\r\n|\n|\r)/gm, "").trim());

  return `
  export type SpellName = ${names.map((name) => `"${name}"`).join(" | ")};
  export type School = ${schools.map((school) => `"${school}"`).join(" | ")};
  export type Flag = ${flags.map((flag) => `"${flag}"`).join(" | ")};

  export type SpellData = {
    id: string;
    name: SpellName;
    schools: School[];
    flags: Flag[];
    level: number;
    power: number;
    range: {
      min: number;
      max: number;
    };
    noise: number;
    tile: string;
  };
`;
};

try {
  const fileContent = fs.readFileSync(
    "src/data/spl-data.trunk.20240209.h",
    "utf8"
  );
  const spellDataSection = extractSpellData(fileContent);

  if (!spellDataSection) {
    throw new Error("Failed to extract spell data section");
  }

  const parsedSpells = parseSpellData(spellDataSection);
  
  const monsterExcludedSpells = parsedSpells.filter(spell => !spell.flags.includes("monster"));
  const monsterAndwandSpellExcludedSpells = monsterExcludedSpells.filter(spell => !Object.values(wandSpells).includes(spell.id));
  const playerNonbookSpellExcludedSpells = monsterAndwandSpellExcludedSpells.filter(spell => !playerNonbookSpells.includes(spell.id));
  
  fs.writeFileSync(
    "src/data/parsed-spells-no-wand-and-monster-and-player-nonbook.json",
    JSON.stringify(playerNonbookSpellExcludedSpells, null, 2)
  );
  
  const sets = extractSets("src/data/parsed-spells.json");
  const typeDefinition = makeTypeDefinition(sets);

  fs.writeFileSync("src/data/extracted-spell-types.d.ts", typeDefinition);
} catch (error) {
  console.error("Failed to process spell data:", error);
  process.exit(1);
}

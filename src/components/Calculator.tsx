import { useState, useEffect, Fragment } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AttrInput from "@/components/AttrInput";
import renderDot from "@/components/chart/SkillDotRenderer";
import CustomSpellTick from "@/components/chart/CustomSpellTick";
import SpellModeHeader from "@/components/SpellModeHeader";
import EVChart from "@/components/chart/EvChart";
import ACChart from "@/components/chart/ACChart";
import SHChart from "@/components/chart/SHChart";
import { CalculatorState } from "@/hooks/useEvCalculatorState";
import { calculateAvgSFData, calculateSFTicks } from "@/utils/calculatorUtils";
import { getSpellSchools } from "@/utils/spellCalculation";
import { spells } from "@/data/spells";
import {
  ArmourKey,
  armourOptions,
  ShieldKey,
  shieldOptions,
} from "@/types/equipment.ts";
import { SpeciesKey, speciesOptions } from "@/types/species.ts";
import { SpellName } from "@/types/spell.ts";

type CalculatorProps = {
  state: CalculatorState;
  setState: React.Dispatch<React.SetStateAction<CalculatorState>>;
};

const checkboxKeys: Array<{ label: string; key: keyof CalculatorState }> = [
  { label: "Helmet", key: "helmet" },
  { label: "Cloak", key: "cloak" },
  { label: "Gloves", key: "gloves" },
  { label: "Boots", key: "boots" },
  { label: "Barding", key: "barding" },
  { label: "2nd Gloves", key: "secondGloves" },
];

const skillAttrKeys: Array<{ label: string; key: keyof CalculatorState }> = [
  {
    label: "Armour Skill",
    key: "armourSkill",
  },
  {
    label: "Shield Skill",
    key: "shieldSkill",
  },
  {
    label: "Dodging Skill",
    key: "dodgingSkill",
  },
];

const Calculator = ({ state, setState }: CalculatorProps) => {
  const [sfData, setSFData] = useState<ReturnType<typeof calculateAvgSFData>>(
    []
  );
  const [sfTicks, setSfTicks] = useState<number[]>([]);

  const firstSchool = spells.find((spell) => spell.name === state.targetSpell)
    ?.schools[0];
  const spellSchools = getSpellSchools(state.targetSpell as SpellName);

  useEffect(() => {
    const firstSFData = calculateAvgSFData(state);
    setSFData(firstSFData);
    setSfTicks(calculateSFTicks(state));
  }, [state]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2">
        <div className="flex flex-row gap-4 items-center flex-wrap">
          <label className="flex flex-row items-center gap-2 text-sm">
            Species:
            <Select
              value={state.species}
              onValueChange={(value) =>
                setState((prev) => ({ ...prev, species: value as SpeciesKey }))
              }
            >
              <SelectTrigger className="w-[180px] h-6">
                <SelectValue placeholder="Species" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(speciesOptions).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name} ({value.size})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <AttrInput
            label="Str"
            value={state.strength}
            type="stat"
            onChange={(value) =>
              setState((prev) => ({ ...prev, strength: value }))
            }
          />
          <AttrInput
            label="Dex"
            value={state.dexterity}
            type="stat"
            onChange={(value) =>
              setState((prev) => ({ ...prev, dexterity: value }))
            }
          />
          <AttrInput
            label="Int"
            value={state.intelligence}
            type="stat"
            onChange={(value) =>
              setState((prev) => ({ ...prev, intelligence: value }))
            }
          />
        </div>
        <div className="flex flex-row items-center gap-2 flex-wrap">
          {skillAttrKeys.map(({ label, key }) => (
            <AttrInput
              key={key}
              label={label}
              value={typeof state[key] === "number" ? state[key] : 0}
              type="skill"
              onChange={(value) =>
                setState((prev) => ({ ...prev, [key]: value }))
              }
            />
          ))}
        </div>
        <div className="flex items-center flex-row gap-4 flex-wrap">
          <label className="flex flex-row items-center gap-2 text-sm">
            Armour:
            <Select
              value={state.armour}
              onValueChange={(value) =>
                setState((prev) => ({ ...prev, armour: value as ArmourKey }))
              }
            >
              <SelectTrigger className="min-w-[100px] gap-2 h-6">
                <SelectValue placeholder="Armour" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(armourOptions).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <label className="flex flex-row items-center gap-2 text-sm">
            Shield:
            <Select
              value={state.shield}
              onValueChange={(value) =>
                setState((prev) => ({ ...prev, shield: value as ShieldKey }))
              }
            >
              <SelectTrigger className="w-[160px] h-6">
                <SelectValue placeholder="Shield" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(shieldOptions).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>
        {!state.spellMode && (
          <div className="flex flex-row gap-4 text-sm items-center flex-wrap">
            {checkboxKeys.map(({ label, key }) => (
              <Fragment key={key}>
                <label
                  htmlFor={key}
                  className="flex flex-row items-center gap-2"
                >
                  <Checkbox
                    checked={!!state[key]}
                    onCheckedChange={(checked) =>
                      setState((prev) => ({ ...prev, [key]: !!checked }))
                    }
                    id={key}
                  />
                  {label}
                </label>
                {key === "boots" && (
                  <div className="h-3 w-px bg-gray-200"></div>
                )}
              </Fragment>
            ))}
          </div>
        )}
        {state.spellMode && (
          <SpellModeHeader state={state} setState={setState} />
        )}
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          value={state.accordionValue}
          onValueChange={(value) =>
            setState((prev) => ({ ...prev, accordionValue: value }))
          }
        >
          {state.spellMode && (
            <AccordionItem value="sf">
              <AccordionTrigger>Spell Failure Rate Calculator</AccordionTrigger>
              <AccordionContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart
                    data={sfData}
                    margin={{ left: 0, right: 10, top: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="spellSkill"
                      label={{
                        value:
                          spellSchools.length > 1
                            ? "Skill Average"
                            : `${firstSchool} Skill`,
                        position: "bottom",
                        offset: 16,
                        style: { fill: "#eee" },
                      }}
                      tickFormatter={(value) => value.toFixed(1)}
                      ticks={sfTicks}
                      interval={0}
                      tick={CustomSpellTick}
                    />
                    <YAxis
                      allowDecimals={false}
                      width={30}
                      tick={{ fill: "#eee" }}
                    />
                    <Tooltip
                      formatter={(value) => {
                        return [`${value}%`, "Spell Failure Rate"];
                      }}
                      labelFormatter={(value) =>
                        `${
                          spellSchools.length > 1
                            ? "Skill Average"
                            : `${firstSchool} Skill`
                        }: ${value}`
                      }
                      wrapperStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        borderColor: "hsl(var(--border))",
                        color: "hsl(var(--popover-foreground))",
                        borderRadius: "calc(var(--radius) - 2px)",
                      }}
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "none",
                      }}
                      itemStyle={{
                        color: "hsl(var(--popover-foreground))",
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      align="center"
                      layout="horizontal"
                      wrapperStyle={{
                        marginLeft: "-150px",
                        marginBottom: "-10px",
                      }}
                    />
                    <Line
                      type="stepAfter"
                      dataKey="spellFailureRate"
                      name=" Spell Failure Rate"
                      isAnimationActive={false}
                      dot={renderDot(
                        "spellSkill",
                        Math.round(
                          spellSchools.reduce(
                            (acc, school) =>
                              acc + (state.schoolSkills?.[school] ?? 0) * 200,
                            0
                          ) /
                            spellSchools.length /
                            20
                        ) / 10
                      )}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </AccordionContent>
            </AccordionItem>
          )}
          <AccordionItem value="ev">
            <AccordionTrigger>EV Calculator</AccordionTrigger>
            <AccordionContent>
              <EVChart state={state} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ac">
            <AccordionTrigger>AC Calculator</AccordionTrigger>
            <AccordionContent>
              <ACChart state={state} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="sh">
            <AccordionTrigger>SH Calculator</AccordionTrigger>
            <AccordionContent>
              <SHChart state={state} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default Calculator;

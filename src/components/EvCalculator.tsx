import { useState, useEffect } from "react";
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
import {
  SpeciesKey,
  ShieldKey,
  speciesOptions,
  shieldOptions,
  calculateEVForSkillLevel,
} from "@/utils/evCalculations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AttrInput from "@/components/AttrInput";
import CustomTick from "@/components/chart/CustomTick";
import { useEvCalculatorState } from "@/hooks/useEvCalculatorState";

type DataPoint = {
  dodgeSkill: number;
  baseEV: number;
  rawDodgeBonus: number;
  actualDodgeBonus: number;
  dodgeModifier: number;
  shieldPenalty: number;
  armourPenalty: number;
  finalEV: number;
};

const EVCalculator = () => {
  const { state, setState } = useEvCalculatorState();
  const [data, setData] = useState<DataPoint[]>([]);
  const [evTicks, setEvTicks] = useState<number[]>([]);

  useEffect(() => {
    const calculateEV = () => {
      const newData = [];
      const evChangePoints = new Set<number>();

      let lastEV = 0;
      // Calculate for dodging skill 0 to 27
      for (let dodge = 0; dodge <= 27; dodge += 0.1) {
        const result = calculateEVForSkillLevel({
          dodgeSkill: dodge,
          dexterity: state.dexterity,
          strength: state.strength,
          species: state.species,
          shield: state.shield,
          armourER: state.armourER,
          shieldSkill: state.shieldSkill,
          armourSkill: state.armourSkill,
        });

        if (result.finalEV !== lastEV && dodge < 27) {
          evChangePoints.add(parseFloat(dodge.toFixed(1)));
          lastEV = result.finalEV;
        }

        newData.push({
          dodgeSkill: parseFloat(dodge.toFixed(1)),
          baseEV: result.baseEV,
          rawDodgeBonus: result.rawDodgeBonus,
          actualDodgeBonus: result.actualDodgeBonus,
          dodgeModifier: parseFloat(result.dodgeModifier.toFixed(2)),
          shieldPenalty: result.shieldPenalty,
          armourPenalty: result.armourPenalty,
          finalEV: result.finalEV,
        });
      }
      setData(newData);
      setEvTicks(Array.from(evChangePoints));
    };

    calculateEV();
  }, [
    state.dexterity,
    state.strength,
    state.species,
    state.shield,
    state.armourER,
    state.shieldSkill,
    state.armourSkill,
  ]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
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
        </div>
        <div className="flex flex-row gap-2">
          <AttrInput
            label="Shield Skill"
            value={state.shieldSkill}
            type="skill"
            onChange={(value) =>
              setState((prev) => ({ ...prev, shieldSkill: value }))
            }
          />
          <AttrInput
            label="Armour Skill"
            value={state.armourSkill}
            type="skill"
            onChange={(value) =>
              setState((prev) => ({ ...prev, armourSkill: value }))
            }
          />
        </div>
        <label className="flex flex-row items-center gap-2">
          Species:
          <Select
            value={state.species}
            onValueChange={(value) =>
              setState((prev) => ({ ...prev, species: value }))
            }
          >
            <SelectTrigger className="w-[200px] h-8">
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
        <div className="flex flex-row gap-4">
          <label className="flex flex-row items-center gap-2">
            Shield:
            <Select
              value={state.shield}
              onValueChange={(value) =>
                setState((prev) => ({ ...prev, shield: value }))
              }
            >
              <SelectTrigger className="w-[200px] h-8">
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
          <div className="flex flex-row gap-2">
            <label>
              <AttrInput
                label="Armour Encumbrance"
                value={state.armourER}
                type="number"
                onChange={(value) =>
                  setState((prev) => ({ ...prev, armourER: value }))
                }
              />
            </label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              data={data}
              margin={{ left: 0, right: 20, top: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="dodgeSkill"
                label={{
                  value: "Dodging Skill",
                  position: "bottom",
                  offset: 16,
                }}
                tickFormatter={(value) => value.toFixed(1)}
                ticks={evTicks}
                interval={0}
                tick={(props) => (
                  <CustomTick {...props} ticks={evTicks} tickLimit={12} />
                )}
              />
              <YAxis allowDecimals={false} width={30} />
              <Tooltip
                formatter={(value) => {
                  return [`${value}`, "EV"];
                }}
                labelFormatter={(value) => `Dodging Skill: ${value}`}
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
                  marginLeft: "-100px",
                  marginBottom: "-10px",
                }}
              />
              <Line type="stepAfter" dataKey="finalEV" name=" EV" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EVCalculator;

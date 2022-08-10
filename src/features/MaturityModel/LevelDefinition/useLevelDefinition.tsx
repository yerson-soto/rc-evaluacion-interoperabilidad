import { useEffect, useState } from "react";
import { ChoiceService } from "library/api/services/ChoiceService";
import { LevelService } from "library/api/services/LevelService";
import { Level } from "library/models/Level";
import { Choice } from "library/models/Choice";
import chroma from "chroma-js";

interface LevelDefinition {
  level: Level;
  hexColor: string;
  choice?: Choice;
}

export function useLevelDefinition(criterionId: number) {
  const [levels, setLevels] = useState<LevelDefinition[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const choiceService = new ChoiceService();
  const levelChoice = new LevelService();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [levels, choices] = await Promise.all([
          levelChoice.getAll(),
          choiceService.getByCriterion(criterionId),
        ]);

        const colorRange = chroma
          .scale(["#ef8269", "#fba31e", "#2ac158"])
          .colors(levels.length);

        const definitionList: LevelDefinition[] = levels.map((level, idx) => {
          const choice = choices.find((choice) => choice.level.id === level.id);
          const hexColor = colorRange[idx];
          
          return { level, choice, hexColor };
        });

        setLevels(definitionList);
      } catch {
        setLevels([]);
      } finally {
        setLoading(false);
      }

    };

    fetchData();
  }, [criterionId]);

  return { levels, isLoading };
}

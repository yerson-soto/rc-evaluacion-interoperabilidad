import { useEffect, useState } from "react";
import { message } from "antd";
import { useAppDispatch } from "redux/hooks";
import { actions as choiceActions } from "redux/slices/choiceSlice";
import { ChoiceService } from "library/api/services/ChoiceService";
import { LevelService } from "library/api/services/LevelService";
import { Level } from "library/models/Level";
import { Choice } from "library/models/Choice";
import { ChoiceFormSchema } from "features/ChoiceCrud/ChoiceForm/ChoiceFormSchema";
import chroma from "chroma-js";

interface LevelDefinition {
  level: Level;
  hexColor: string;
  choice?: Choice;
}

// TODO: SelectState better than selectResults and SelectLoading
export function useLevelDefinition(criterionId: number) {
  const [associations, setAssociations] = useState<LevelDefinition[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
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
          .scale(["#fce4d7", "#fff1cf", "#feffd5", "#e2efda", "#c6e0b3"])
          .colors(levels.length);

        const associationList: LevelDefinition[] = levels.map((level, idx) => {
          const choice = choices.find((choice) => choice.level.id === level.id);
          const hexColor: string = colorRange[idx];

          return { level, choice, hexColor };
        });

        setAssociations(associationList);
      } catch {
        setAssociations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [criterionId]);

  const createAssociation = async (data: ChoiceFormSchema): Promise<void> => {
    dispatch(choiceActions.startLoading());

    choiceService
      .create(data)
      .then((choice) => {
        _updateAssociations(choice.level.id, choice);
        dispatch(choiceActions.createSuccess(choice));
      })
      .catch((errorMessage) => {
        dispatch(choiceActions.createFailed(errorMessage));

        message.error(errorMessage);

        throw new Error(errorMessage);
      });
  };

  const editAssociation = async (
    choiceId: number,
    data: ChoiceFormSchema
  ): Promise<void> => {
    dispatch(choiceActions.startLoading());

    choiceService
      .edit(choiceId, data)
      .then((choice) => {
        _updateAssociations(choice.level.id, choice);
        dispatch(choiceActions.editSuccess(choice));
      })
      .catch((errorMessage) => {
        dispatch(choiceActions.editFailed(errorMessage));

        message.error(errorMessage);

        throw new Error(errorMessage);
      });
  };

  const deleteAssociation = async (choice: Choice): Promise<void> => {
    dispatch(choiceActions.startLoading());

    choiceService
      .delete(choice.id)
      .then(() => {
        _updateAssociations(choice.level.id);
        dispatch(choiceActions.deleteSuccess(choice.id));
      })
      .catch((errorMessage) => {
        dispatch(choiceActions.deleteFailed(errorMessage));

        message.error(errorMessage);

        throw new Error(errorMessage);
      });
  };

  const _updateAssociations = (levelId: number, choice?: Choice) => {
    const associationsCopy = [...associations];
    let updatedAssociation = associationsCopy.find(
      (association) => association.level.id === levelId
    );

    if (updatedAssociation) {
      updatedAssociation.choice = choice;
    }

    setAssociations(associationsCopy);
  };

  return {
    associations,
    isLoading,
    createAssociation,
    editAssociation,
    deleteAssociation,
  };
}

import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Typography, Tag, Grid, Skeleton, Tooltip } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Criterion } from "library/models/Criterion";
import { useLevelDefinition } from "./useLevelDefinition";

import { AppBox } from "library/components/AppBox";
import { EditAction } from "features/Crud/EditAction";
import { ChoiceFormSchema } from "features/ChoiceCrud/ChoiceForm/ChoiceFormSchema";
import { ChoiceForm } from "features/ChoiceCrud/ChoiceForm";
import { ChoiceState, choiceSlice } from "redux/slices/choiceSlice";
import { ChoiceService } from "library/api/services/ChoiceService";
import { ChoiceMapper } from "library/api/mappers/ChoiceMapper";
import { CreateAction } from "features/Crud/CreateAction";
import { Choice } from "library/models/Choice";
import { Level } from "library/models/Level";

import classes from "./LevelDefinition.module.css";

interface LevelDefinitionProps {
  criterion: Criterion;
}
// TODO: Refactor level definition style (responsive)
export default function LevelDefinition({ criterion }: LevelDefinitionProps) {
  const {
    associations,
    isLoading,
    createAssociation,
    editAssociation,
    deleteAssociation,
  } = useLevelDefinition(criterion.id);
  const { t } = useTranslation();
  const { md } = Grid.useBreakpoint();

  const choiceService = new ChoiceService();
  const choiceMapper = new ChoiceMapper();

  const handleDelete = (
    event: React.MouseEvent<HTMLSpanElement>,
    choice: Choice
  ) => {
    event.stopPropagation();
    deleteAssociation(choice);
  };

  const renderEditAction = (choice: Choice) => (
    <EditAction<Choice, ChoiceFormSchema, ChoiceState>
      idSource="id"
      record={choice}
      service={choiceService}
      reducer={choiceSlice}
      selectLoading={(state) => state.choices.isLoading}
      render={({ visible, loading, record, onClose }) => (
        <ChoiceForm
          show={visible}
          isLoading={loading}
          onHide={onClose}
          onSave={(values) => editAssociation(record.id, values)}
          defaults={choiceMapper.modelToFormSchema(record)}
          hiddenFields={["levelId", "criterionId"]}
          isEdit
        />
      )}
      renderTrigger={(trigger) => (
        <Typography.Text
          className={classes.choice}
          onClick={trigger}
          ellipsis={{
            tooltip: choice.details,
          }}
        >
          {choice.details}

          <DeleteOutlined
            className={classes.deleteIcon}
            onClick={(event) => handleDelete(event, choice)}
          />
        </Typography.Text>
      )}
    />
  );

  const renderCreateAction = (level: Level) => (
    <CreateAction<Choice, ChoiceFormSchema, ChoiceState>
      toggleKey={`${criterion.id}-${level.id}`}
      reducer={choiceSlice}
      service={choiceService}
      selectLoading={(state) => state.auth.isLoading}
      render={({ visible, loading, onClose }) => (
        <ChoiceForm
          show={visible}
          isLoading={loading}
          onHide={onClose}
          onSave={createAssociation}
          defaults={{
            criterionId: criterion.id,
            levelId: level.id,
            details: "",
            isEvidenceRequired: false,
            requiredEvidences: [],
          }}
          hiddenFields={["criterionId", "levelId"]}
        />
      )}
      renderTrigger={(trigger) => (
        <Button
          type="dashed"
          size="large"
          icon={<PlusOutlined />}
          onClick={trigger}
        >
          {md ? t("buttons.add_choice") : null}
        </Button>
      )}
    />
  );

  return (
    <Skeleton loading={isLoading} paragraph={{ rows: 6 }} active>
      <AppBox className={classes.box}>
        {associations.map(({ level, choice, hexColor }) => (
          <AppBox key={level.id} className={classes.tile}>
            <Tooltip
              title={
                <>
                  <strong>{`${t("labels.level")} ${level.value} - ${level.name}`}</strong>
                  <br />
                  {level.description}
                </>
              }
            >
              <Tag color={hexColor} className={classes.level}>
                <Typography.Text ellipsis>{level.name}</Typography.Text>
              </Tag>
            </Tooltip>

            {choice ? renderEditAction(choice) : renderCreateAction(level)}
          </AppBox>
        ))}
      </AppBox>
    </Skeleton>
  );
}

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Badge, Divider, Space, Tag, Tooltip } from "antd";
import { Box } from "library/components/Box";
import { AnswerRadio } from "../AnswerRadio";
import { Avatar, List } from "antd";
import { Criterion } from "library/models/Criterion";
import { Choice } from "library/models/Choice";
import { AddEvidence } from "features/EvaluationInit/AddEvidence";

import classes from "./Question.module.css";

import chroma from "chroma-js";

const choices = [
  "No existe un responsable de los servicios de intercambio de información",
  "Existen varias personas responsables de los servicios de intercambio de información",
  "Existe un único responsable de intercambio de información pero no es formal",
  "Existe un responsable de los servicios de intercambio de información y es reconocido por toda la entidad",
  "Existe un responsable de los servicios de intercambio de información y lidera a toda la organización en la implementación del Marco de interoperabilidad",
];

const colors = chroma
  .scale(["#ed9324", "#d1af26", "#27af0e"])
  .colors(choices.length);

const fakeChoices: Choice[] = choices.map((text, idx) => {
  const number = idx + 1;
  return {
    id: number,
    hexColor: colors[idx],
    details: text,
    level: {
      id: number,
      value: number,
      name: "Lorem Ipsum",
    },
  };
});

interface QuestionProps {
  number: number;
  criterion: Criterion;
  onLevelChange: (level: number) => void;
  onEvidenceAdd: () => void;
  onEvidenceDelete: () => void;
}

export default function Question(props: QuestionProps) {
  const { number: count, criterion, onLevelChange } = props;
  const { t } = useTranslation();

  const handleEvidenceChange = (): void => {};

  const handleLevelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const level = Number(event.target.value);
    onLevelChange(level);
  };

  return (
    <List.Item className={classes.question}>
      <List.Item.Meta
        avatar={<Avatar className={classes.number}>{count}</Avatar>}
        title={criterion.name}
      />

      <Divider className={classes.divider} orientation="left">
        {t("dividers.lineaments")}
      </Divider>

      <Space className={classes.section} size={[0, 10]} wrap>
        {criterion.categories.map((category) => (
          <Tooltip key={category.id} title={category.description}>
            <Tag color="volcano" className={classes.tag}>
              {category.nomenclature}
            </Tag>
          </Tooltip>
        ))}
      </Space>

      <Divider className={classes.divider} orientation="left">
        {t("dividers.levels")}
      </Divider>

      <Space className={classes.section} direction="vertical" size={15}>
        {fakeChoices.map((choice) => (
          <Box key={choice.id} className={classes.choice}>
            <Badge.Ribbon
              placement="start"
              color={choice.hexColor}
              text={choice.level.value}
            >
              <AnswerRadio
                value={choice.level.value}
                name="choice"
                color="#fce5d7"
                onChange={handleLevelChange}
                label={choice.details}
              />
            </Badge.Ribbon>
          </Box>
        ))}
      </Space>

      <Divider className={classes.divider} orientation="left">
        {t("dividers.justification")}
      </Divider>

      <Box className={classes.section}>
        <Alert
          className={classes.alert}
          message={t("hints.upload_evidence")}
          type="info"
        />

        <AddEvidence />
      </Box>

      <Divider className={classes.divider} orientation="left">
        {t("dividers.next_steps")}
      </Divider>

      <Box className={classes.section}>Pasos a seguir</Box>
    </List.Item>
  );
}

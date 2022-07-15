import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Skeleton, Space, Tag, Tooltip } from "antd";
import { Box } from "library/components/Box";
import { Avatar, List } from "antd";
import { FullCriterion } from "library/models/Criterion";
import { SectionDivider } from "library/components/SectionDivider";
import { AddEvidence } from "features/EvaluationInit/AddEvidence";
import { Response } from "features/EvaluationInit/Response";
import { useChoiceList } from "./useChoiceList";
import { Choice } from "library/models/Choice";
import { Question } from "library/models/Question";

import classes from "./QuestionItem.module.css";

import chroma from "chroma-js";

// const choices = [
//   "No existe un responsable de los servicios de intercambio de información",
//   "Existen varias personas responsables de los servicios de intercambio de información",
//   "Existe un único responsable de intercambio de información pero no es formal",
//   "Existe un responsable de los servicios de intercambio de información y es reconocido por toda la entidad",
//   "Existe un responsable de los servicios de intercambio de información y lidera a toda la organización en la implementación del Marco de interoperabilidad",
// ];

// const colors = chroma
//   .scale(["#ef8269", "#fba31e", "#2ac158"])
//   .colors(choices.length);
// const isLoading = true;
// const fakeChoices: Choice[] = choices.map((text, idx) => {
//   const number = idx + 1;
//   return {
//     id: number,
//     hexColor: colors[idx],
//     details: text,
//     level: {
//       id: number,
//       value: number,
//       name: "Ausente",
//     },
//   };
// });

interface QuestionItemProps {
  number: number;
  question: Question;
  onLevelChange: (choice: Choice) => void;
  onEvidenceAdd: () => void;
  onEvidenceDelete: () => void;
}

export default function QuestionItem(props: QuestionItemProps) {
  const { number: count, question, onLevelChange } = props;
  // const { isLoading, choices } = useChoiceList(criterion.id);
  const { t } = useTranslation();

  const { criterion } = question;

  const handleEvidenceChange = (): void => {};

  const handleLevelChange = (choice: Choice): void => {
    onLevelChange(choice);
  };

  const renderResponses = (): React.ReactNode => {
    const choices = criterion.choices;
    
    const colors = chroma
      .scale(["#ef8269", "#fba31e", "#2ac158"])
      .colors(choices.length);
      
    return choices.map((choice, index) => (
      <Response
        key={choice.id}
        choice={choice}
        color={colors[index]}
        isSelected={choice.id === question.response?.id}
        onChange={() => handleLevelChange(choice)}
      />
    ))
  }

  return (
    <List.Item className={classes.question}>
      <List.Item.Meta
        avatar={<Avatar className={classes.number}>{count}</Avatar>}
        title={criterion.name}
      />

      <SectionDivider text={t("dividers.lineaments")} />
      <Space className={classes.section} size={[0, 10]} wrap>
        {criterion.categories.map((category) => (
          <Tooltip key={category.id} title={category.description}>
            <Tag color="orange" className={classes.tag}>
              {category.nomenclature}
            </Tag>
          </Tooltip>
        ))}
      </Space>

      <SectionDivider text={t("dividers.levels")} />
        <Space className={classes.section} direction="vertical" size={15}>
          {renderResponses()}
        </Space>

      <SectionDivider text={t("dividers.justification")} />
      <Box className={classes.section}>
        <Alert
          className={classes.alert}
          message={t("hints.upload_evidence")}
          type="info"
        />

        <AddEvidence />
      </Box>

      <SectionDivider text={t("dividers.next_steps")} />
      <Box className={classes.section}>Pasos a seguir</Box>
    </List.Item>
  );
}

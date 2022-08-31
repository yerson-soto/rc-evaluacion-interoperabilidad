import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { Alert, Space, Tag, Tooltip } from "antd";
import { AppBox } from "library/components/AppBox";
import { Avatar, List } from "antd";
import { SectionDivider } from "library/components/SectionDivider";
import { EvidenceUpload } from "features/EvaluationDetail/EvidenceUpload";
import { Answer } from "features/EvaluationDetail/Answer";
import { Choice } from "library/models/Choice";
import { Question } from "library/models/Question";
import { AnswerEvidence } from 'library/models/Question';

import classes from "./QuestionItem.module.css";
import chroma from "chroma-js";


interface QuestionItemProps {
  question: Question;
  onAnswerChange: (choice: Choice) => void;
  onEvidenceChange: (evidences: AnswerEvidence[]) => void;
}

export default function QuestionItem(props: QuestionItemProps) {
  const { question, onAnswerChange, onEvidenceChange } = props;
  const { criterion, number: count, choosenAnswer } = question;
  const { t } = useTranslation();
  const nodeRef = useRef(null);

  const showEvidences = choosenAnswer?.isEvidenceRequired;
 
  const renderResponses = (): React.ReactNode => {
    const choices = criterion.choices;
    
    const colors = chroma
      .scale(["#ef8269", "#fba31e", "#2ac158"])
      .colors(choices.length);
      
    return choices.map((choice, index) => (
      <Answer
        key={choice.id}
        choice={choice}
        color={colors[index]}
        isSelected={choice.id === question.choosenAnswer?.id}
        onChange={() => onAnswerChange(choice)}
      />
    ))
  };

  return (
    <List.Item className={classes.question}>
      <List.Item.Meta
        avatar={<Avatar className={classes.number}>{count}</Avatar>}
        title={criterion.name}
      />

      <SectionDivider text={t("dividers.lineaments")} />
      <Space className={classes.section} size={[0, 10]} wrap>
        {criterion.lineaments.map((category) => (
          <Tooltip 
            key={category.id} 
            title={category.description}
          >
            <Tag color="orange" className={classes.tag}>
              {category.nomenclature}
            </Tag>
          </Tooltip>
        ))}
      </Space>

      <SectionDivider text={t("dividers.levels")} />
        <Space 
          className={classes.section} 
          direction="vertical" 
          size={15}
        >
          {renderResponses()}
        </Space>

        <CSSTransition
          in={showEvidences}
          timeout={300}
          classNames="fade"
          nodeRef={nodeRef}
          unmountOnExit
        >
          <div ref={nodeRef as any}> 
            <SectionDivider text={t("dividers.justification")} />
            <AppBox className={classes.section}>
              <Alert
                className={classes.alert}
                message={t("hints.upload_evidence")}
                type="info"
              />

              <EvidenceUpload 
                question={question} 
                onChange={onEvidenceChange} 
              />
            </AppBox>
          </div>
        </CSSTransition>

      {/* <SectionDivider text={t("dividers.next_steps")} />
      <AppBox className={classes.section}>Pasos a seguir</AppBox> */}
    </List.Item>
  );
}

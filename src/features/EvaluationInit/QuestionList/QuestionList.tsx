import React from "react";
import { List } from "antd";
import { useParams } from "react-router-dom";
import { QuestionItem } from "features/EvaluationInit/QuestionItem";
import { Criterion } from "library/models/Criterion";
import { Question } from "library/models/Question";
import { LightChoice } from "library/models/Choice";
import { useCompleteQuestion } from "./useCompleteQuestion";

export interface QuestionaryProps {
  questions: Question[];
  activeQuestion: number;
}

export default function QuestionList({ questions, activeQuestion }: QuestionaryProps) {
  const { changeAnswer } = useCompleteQuestion();
  const { uid: evaluationId } = useParams<Record<"uid", string>>();

  const changeSelectedAnswer = (
    criterion: Criterion,
    choice: LightChoice
  ): void => {
    if (evaluationId) {
      changeAnswer(evaluationId, criterion.id, choice.id);
    }
  };

  return (
    <List<Question>
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 1,
        current: activeQuestion,
        style: {
          display: "none",
        },
      }}
      split={false}
      dataSource={questions}
      renderItem={(question) => (
        <QuestionItem
          key={question.criterion.id}
          question={question}
          onAnswerChange={changeSelectedAnswer}
          onEvidenceDelete={() => {}}
          onEvidenceAdd={() => {}}
        />
      )}
    />
  );
}

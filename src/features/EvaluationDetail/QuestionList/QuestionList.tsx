import React from "react";
import { List } from "antd";
import { useParams } from "react-router-dom";
import { PaginationConfig } from "antd/lib/pagination";
import { QuestionItem } from "features/EvaluationDetail/QuestionItem";
import { Question } from "library/models/Question";
import { Choice } from "library/models/Choice";
import { useCompleteQuestion } from "./useCompleteQuestion";

export interface QuestionaryProps {
  questions: Question[];
  // TODO: change active question o number
  activeQuestion: Question | null;
}

export default function QuestionList(props: QuestionaryProps) {
  const { changeAnswer } = useCompleteQuestion();
  const { uid: evaluationId } = useParams<Record<"uid", string>>();
  const { questions, activeQuestion } = props;

  const paginationConfig: PaginationConfig = {
    pageSize: 1,
    style: {
      display: "none",
    },
  };

  if (activeQuestion) {
    paginationConfig["current"] = activeQuestion.number;
  }

  const changeSelectedAnswer = (choice: Choice): void => {
    if (evaluationId) {
      changeAnswer(evaluationId, choice);
    }
  };

  return (
    <List<Question>
      itemLayout="vertical"
      size="large"
      pagination={paginationConfig}
      split={false}
      dataSource={questions}
      renderItem={(question) => (
        <QuestionItem
          key={question.number}
          question={question}
          onAnswerChange={changeSelectedAnswer}
          onEvidenceDelete={() => {}}
          onEvidenceAdd={() => {}}
        />
      )}
    />
  );
}

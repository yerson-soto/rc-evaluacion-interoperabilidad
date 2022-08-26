import React from "react";
import { List } from "antd";
import { useParams } from "react-router-dom";
import { QuestionItem } from "features/EvaluationDetail/QuestionItem";
import { Question } from "library/models/Question";
import { Choice } from "library/models/Choice";
import { useCompleteQuestion } from "./useCompleteQuestion";

export interface QuestionaryProps {
  questions: Question[];
  activeQuestion: Question | null;
}

export default function QuestionList(props: QuestionaryProps) {
  const { changeAnswer } = useCompleteQuestion();
  const { uid: evaluationId } = useParams<Record<"uid", string>>();
  const { questions, activeQuestion } = props;

  const changeSelectedAnswer = (choice: Choice): void => {
    if (evaluationId) {
      changeAnswer(evaluationId, choice);
    }
  };

  return (
    <List<Question>
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 1,
        current: activeQuestion?.number,
        style: {
          display: "none",
        },
      }}
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

import React from "react";
import { List } from "antd";
import { useParams } from "react-router-dom";
import { PaginationConfig } from "antd/lib/pagination";
import { QuestionItem } from "features/EvaluationDetail/QuestionItem";
import { Question } from "library/models/Question";
import { Choice } from "library/models/Choice";
import { useCompleteQuestion } from "./useCompleteQuestion";
import { AnswerEvidence } from "library/models/Question";

export interface QuestionaryProps {
  questions: Question[];
  activeQuestion: number;
}

export default function QuestionList(props: QuestionaryProps) {
  const { updateAnswer, updateEvidences } = useCompleteQuestion();
  const { uid: evaluationId } = useParams<Record<"uid", string>>();
  const { questions, activeQuestion } = props;

  const paginationConfig: PaginationConfig = {
    pageSize: 1,
    current: activeQuestion,
    style: {
      display: "none",
    },
  };

  const changeAnswer = (choice: Choice): void => {
    if (evaluationId) {
      updateAnswer(evaluationId, choice);
    }
  };

  const changeEvidences = (
    question: Question,
    evidences: AnswerEvidence[]
  ): void => {
    updateEvidences(question, evidences);
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
          onAnswerChange={changeAnswer}
          onEvidenceChange={(evidences) => 
            changeEvidences(question, evidences)
          }
        />
      )}
    />
  );
}

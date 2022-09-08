import React from "react";
import { List } from "antd";
import { PaginationConfig } from "antd/lib/pagination";
import { QuestionItem } from "features/EvaluationDetail/QuestionItem";
import { Question } from "library/models/Question";
import { useQuestionChange } from "./useQuestionChange";

export interface QuestionaryProps {
  questions: Question[];
}

export default function QuestionList(props: QuestionaryProps) {
  const { questions } = props;
  const { currentPage, updateAnswer, updateEvidences } = useQuestionChange();

  const paginationConfig: PaginationConfig = {
    current: currentPage === 'finish-page' ? questions.length : currentPage,
    pageSize: 1,
    style: {
      display: 'none'
    }
  };
  
  return (
    <List<Question>
      itemLayout="vertical"
      size="large"
      className="question-list"
      pagination={paginationConfig}
      split={false}
      dataSource={questions}
      renderItem={(question) => (
        <QuestionItem
          key={question.number}
          question={question}
          onAnswerChange={updateAnswer}
          onEvidenceChange={(evidences) => 
            updateEvidences(question, evidences)
          }
        />
      )}
    />
  );
}

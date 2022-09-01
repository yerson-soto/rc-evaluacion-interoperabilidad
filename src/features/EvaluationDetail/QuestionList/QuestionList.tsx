import React from "react";
import { Button, List } from "antd";
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import { PaginationConfig, PaginationProps } from "antd/lib/pagination";
import { QuestionItem } from "features/EvaluationDetail/QuestionItem";
import { Question } from "library/models/Question";
import { Choice } from "library/models/Choice";
import { useQuestionControls } from "./useQuestionControls";
import { AnswerEvidence } from "library/models/Question";

import './QuestionList.css';
import { CheckOutlined } from '@ant-design/icons';

export interface QuestionaryProps {
  questions: Question[];
}

export default function QuestionList(props: QuestionaryProps) {
  const { questions } = props;
  const { t } = useTranslation()
  const { 
    activeQuestion,
    setActiveQuestion,
    updateAnswer,
    updateEvidences,
  } = useQuestionControls();
  
  

  const renderPaginationItem: PaginationProps["itemRender"] = (
    page,
    type,
    originalElement
  ) => {
    const buttons: Record<string, any> = {
      prev: (
        <Button>
          {t("buttons.back")}
        </Button>
      ),
      next: (
        <Button type="primary">
          {t("buttons.save")}
        </Button>
      ),
    };

    if (type === 'page' && page === activeQuestion) {
      return <CheckOutlined style={{ color: "#1890ff" }} />
    }

    return buttons[type] || originalElement;
  };

  const paginationConfig: PaginationConfig = {
    pageSize: 1,
    current: activeQuestion,
    total: questions.length,
    responsive: true,
    showSizeChanger: false,
    itemRender: renderPaginationItem,
    onChange: setActiveQuestion
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

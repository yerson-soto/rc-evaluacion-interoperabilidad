import React from "react";
import { Button, List } from "antd";
import { useTranslation } from 'react-i18next';
import { CheckOutlined } from '@ant-design/icons';
import { PaginationConfig, PaginationProps } from "antd/lib/pagination";
import { QuestionItem } from "features/EvaluationDetail/QuestionItem";
import { Question } from "library/models/Question";
import { useQuestionControls } from "./useQuestionControls";
import { Domain } from "library/models/Domain";

import './QuestionList.css';

export interface QuestionaryProps {
  domain: Domain;
  questions: Question[];
}

export default function QuestionList(props: QuestionaryProps) {
  const { domain, questions } = props;
  const { t } = useTranslation()
  const { 
    isSaving,
    activeQuestion,
    setActiveQuestion,
    updateAnswer,
    updateEvidences
  } = useQuestionControls(domain);
  
  const renderPaginationItem: PaginationProps["itemRender"] = (
    page,
    type,
    originalElement
  ) => {
    const question = questions.find(q => q.number === page);
    const currentQuestion = questions.find(q => q.number === activeQuestion);
    
    const buttons: Record<string, any> = {
      prev: (
        <Button>
          {t("buttons.back")}
        </Button>
      ),
      next: (
        <Button loading={isSaving}>
          {currentQuestion?.isSaved ? "Siguiente" : t("buttons.save")}
        </Button>
      ),
    };

    if (type === 'page' && question?.isSaved) {
      return <CheckOutlined style={{ color: "#1890ff" }} />
    }

    return originalElement;
  };

  const paginationConfig: PaginationConfig = {
    pageSize: 1,
    current: activeQuestion,
    total: questions.length,
    showSizeChanger: false,
    itemRender: renderPaginationItem,
    onChange: setActiveQuestion,
    showLessItems: true
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

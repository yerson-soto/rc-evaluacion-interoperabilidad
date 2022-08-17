import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { List, Grid, Badge, Pagination, Button, Skeleton } from "antd";
import { QuestionItem } from "features/EvaluationInit/QuestionItem";
import { FullCriterion } from "library/models/Criterion";
import { PaginationProps } from "antd/es/pagination";
import { Domain } from "library/models/Domain";

import { useQuestionary } from "./useQuestionary";
import { Question } from "library/models/Question";
import { LightChoice } from "library/models/Choice";
import { AppDrawer } from "library/components/AppDrawer";

import classes from "./Questionary.module.css";
import { useDetailAction } from "../../Crud/DetailAction/useDetailAction";
import { DomainService } from "library/api/services/DomainService";
import { AppLoader } from "library/components/AppLoader";
import { useTranslation } from "react-i18next";
import { NotFound } from "features/NotFound";
import {useToggleQuestionary} from "./useToggleQuestionary";
import {useDomain} from "./useDomain";

const { useBreakpoint } = Grid;

interface CriterionScore {
  [id: number]: number;
}

export interface QuestionaryProps {
  isOpen: boolean;

  // This is used to keep domain during transition
  onClose: (keepDomain: Domain) => void;
  onCloseEnd: () => void;

  // onChangeLevel: (value: number) => void;
}

export default function Questionary(props: QuestionaryProps) {
  const [score, setScore] = useState<CriterionScore>([]);
  const [current, setCurrent] = useState(1);

  const { visible, close } = useToggleQuestionary();
  const { isLoading, isError, domain, domainTitle } = useDomain();
  const { t } = useTranslation();



  const { uid } = useParams();

  const { isLoading: questionsLoading, questions, changeResponse } = useQuestionary(domain?.id);

  const onResponseChange = (
    criterion: FullCriterion,
    choice: LightChoice
  ): void => {
    changeResponse({
      evaluationInstitutionalId: uid as string,
      criterionId: criterion.id,
      responsesId: choice.id,
    });

    // onChangeLevel(.5);
    const newScore = {
      ...score,
      [criterion.id]: choice.level.value,
    };

    setScore(newScore);
  };

  const getScore = (): number => {
    const total: number = Object.values(score).reduce(
      (prev, current) => prev + current,
      0
    );

    return Number((total / questions.length).toFixed(2)) || 0;
  };

  const renderPaginationItem: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    const buttons: Record<string, any> = {
      prev: <Button style={{ fontFamily: "Maven Pro" }}>Anterior</Button>,
      next: <Button style={{ fontFamily: "Maven Pro" }}>Siguiente</Button>,
    };

    return buttons[type] || originalElement;
  };

  const onPageChange = (page: number): void => {
    setCurrent(page);
  };

  return (
    <AppDrawer
      placement="right"
      title={domainTitle}
      visible={visible}
      // extra={<Badge status="processing" text={getScore()} />}
      onClose={close}
      // afterVisibleChange={onVisibilityChange}
      footer={
        <Pagination
          pageSize={1}
          total={questions.length}
          itemRender={renderPaginationItem}
          onChange={onPageChange}
          current={current}
        />
      }
      forceRender
      destroyOnClose
    >
      {isError ? (
        <NotFound 
          fallbackLabel={t("buttons.close")} 
          onFallback={close} 
        />
      ) : (
        <Skeleton
          paragraph={{ rows: 7 }}
          loading={isLoading}
          active
          avatar
        >
          <List<Question>
            itemLayout="vertical"
            size="large"
            loading={questionsLoading}
            pagination={{
              pageSize: 1,
              current: current,
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
                onLevelChange={(choice) =>
                  onResponseChange(question.criterion, choice)
                }
                onEvidenceDelete={() => {}}
                onEvidenceAdd={() => {}}
                number={current}
              />
            )}
          />
        </Skeleton>
      )}
    </AppDrawer>
  );
}

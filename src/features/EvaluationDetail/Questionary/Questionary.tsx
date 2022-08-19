import React from "react";
import { useTranslation } from "react-i18next";
import { Pagination, Button, Skeleton } from "antd";
import { PaginationProps } from "antd/es/pagination";
import { AppDrawer } from "library/components/AppDrawer";
import { NotFound } from "features/NotFound";
import { QuestionList } from "../QuestionList";
import { useToggleQuestionary } from "./useToggleQuestionary";
import { useDomain } from "./useDomain";
import { useQuestionary } from "./useQuestionary";

export default function Questionary() {
  const { visible, close } = useToggleQuestionary();
  const { isFetching, isError, domain, domainTitle, flushDomain } = useDomain();
  const { isLoading, questionary, currentQuestion, changeCurrentQuestion, flushQuestions } = useQuestionary(domain?.id);
  const { t } = useTranslation();

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

  const changeQuestion = (page: number): void => {
    changeCurrentQuestion(page);
  };

  const renderPagination = (): React.ReactNode =>
    questionary.length > 0 ? (
      <Pagination
        pageSize={1}
        total={questionary.length}
        itemRender={renderPaginationItem}
        onChange={changeQuestion}
        current={currentQuestion}
      />
    ) : null;

  const hideQuestionary = (): void => {
    flushDomain();
    flushQuestions();
    close();
  }

  return (
    <AppDrawer
      placement="right"
      title={domainTitle}
      visible={visible}
      onClose={hideQuestionary}
      footer={renderPagination()}
      forceRender
      destroyOnClose
    >
      {visible && (
        <Skeleton
          paragraph={{ rows: 7 }}
          loading={isLoading || isFetching}
          active
          avatar
        >
          {isError ? (
            <NotFound 
              fallbackLabel={t("buttons.close")} 
              onFallback={hideQuestionary} 
            />
          ) : (
            <QuestionList 
              questions={questionary} 
              activeQuestion={currentQuestion} 
            />
          )}
        </Skeleton>
      )}
    </AppDrawer>
  );
}

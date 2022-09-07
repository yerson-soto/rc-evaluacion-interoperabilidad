import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Skeleton, Space } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { NotFound } from "features/NotFound";
import { QuestionList } from "../QuestionList";
import { useToggleQuestionary } from "./useToggleQuestionary";
import { useDomain } from "./useDomain";
import { useQuestionList } from "../QuestionList/useQuestionList";
import { Domain } from "library/models/Domain";
import { AppBox } from "library/components/AppBox";
import { useQuestionary } from "./useQuestionary";

import classes from "./Questionary.module.css";

export default function Questionary() {
  const { visible, close } = useToggleQuestionary();
  const { isFetching, isError, domain, domainTitle, resetDomain } = useDomain();
  const { isLoading, questions, flushQuestions } = useQuestionList(domain?.id);
  const { t } = useTranslation();
  const {
    isSaving,
    activeQuestion,
    prevActive,
    prevQuestion,
    nextQuestion,
  } = useQuestionary(domain?.id);

  const hideQuestionary = (): void => {
    const willLoseData = !activeQuestion?.isSaved;

    if (willLoseData) {
      const leave = window.confirm(t("alerts.ask_close_questionary"));
      if (!leave) return;
    }

    resetDomain();
    flushQuestions();
    close();
  };

  const renderFooter = (): React.ReactNode => {
    const showNext = activeQuestion?.isSaved;
    
    return (
      <Space className={classes.footer}>
        <AppBox className={classes.badge}>
          {activeQuestion?.number + " de " + questions.length}
        </AppBox>

        <Button.Group>
          <Button disabled={!prevActive} onClick={prevQuestion}>
            {t("buttons.back")}
          </Button>
          <Button
            type={showNext ? "default" : "primary"}
            onClick={nextQuestion}
            loading={isSaving}
          >
            {showNext ? t("buttons.next") : t("buttons.save")}
          </Button>
        </Button.Group>
      </Space>
    );
  };

  return (
    <AppDrawer
      placement="right"
      title={domainTitle}
      visible={visible}
      onClose={hideQuestionary}
      forceRender
      destroyOnClose
      footer={renderFooter()}
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
              domain={domain as Domain} 
              questions={questions} 
            />
          )}
        </Skeleton>
      )}
    </AppDrawer>
  );
}

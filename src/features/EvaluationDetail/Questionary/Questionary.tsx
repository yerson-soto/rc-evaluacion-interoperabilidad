import React from "react";
import { useTranslation } from "react-i18next";
import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Modal, Result, Skeleton, Space } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { NotFound } from "features/NotFound";
import { useToggleParam } from 'library/hooks/useToggleParam';
import { useDomain } from "./useDomain";
import { useQuestionList } from "../QuestionList/useQuestionList";
import { AppBox } from "library/components/AppBox";
import { useQuestionary } from "./useQuestionary";
import { QuestionList } from "../QuestionList";
import { FinishQuiz } from './FinishQuiz';
import { keys } from "library/common/constants";

import classes from "./Questionary.module.css";

// TODO: Sometimes appear as undefined
export default function Questionary() {
  const { visible, setClose } = useToggleParam(keys.domainParamName);
  const { isFetching, isError, domain, domainTitle, resetDomain } = useDomain();
  const { isLoading, questions, flushQuestions } = useQuestionList(domain?.id);
  const { t } = useTranslation();
  const { isSaving, current, prevActive, prevQuestion, nextQuestion } =
    useQuestionary(domain?.id);

  const currentQuestion = questions.find((q) => q.number === current);
  const hasEnded = current === "finish-page";

  const cleanState = () => {
    resetDomain();
    flushQuestions();
  };

  const closeQuestionary = (): void => {
    const isModified = Boolean(
      currentQuestion?.choosenAnswer || currentQuestion?.answerEvidences.length
    );
    const willLoseData = isModified && !currentQuestion?.isSaved;
    
    if (willLoseData) {
      Modal.confirm({
        icon: <InfoCircleFilled />,
        title: t("labels.attention"),
        content: t("alerts.ask_close_questionary"),
        okText: t("buttons.yes"),
        cancelText: t("buttons.no"),
        onOk: setClose,
      });
    } else {
      setClose();
    }
  };

  const renderFooter = (): React.ReactNode => {
    if (isLoading || isFetching || isError || hasEnded) return;
    
    const showNext = currentQuestion?.isSaved;

    return (
      <Space className={classes.footer}>
        <AppBox className={classes.badge}>
          {currentQuestion?.number + " de " + questions.length}
        </AppBox>

        <Button.Group>
          <Button disabled={!prevActive} onClick={prevQuestion}>
            {t("buttons.previous")}
          </Button>
          <Button
            disabled={!currentQuestion?.isCompleted}
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
      open={visible}
      onClose={closeQuestionary}
      onCloseEnd={cleanState}
      forceRender
      destroyOnClose
      footer={renderFooter()}
      bodyStyle={{
        overflowY: 'scroll'
      }}
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
              onFallback={closeQuestionary}
            />
          ) : hasEnded ? (
            <FinishQuiz 
              onBack={prevQuestion} 
              onClose={closeQuestionary} 
            />
          ) : (
            <QuestionList questions={questions} />
          )}
        </Skeleton>
      )}
    </AppDrawer>
  );
}
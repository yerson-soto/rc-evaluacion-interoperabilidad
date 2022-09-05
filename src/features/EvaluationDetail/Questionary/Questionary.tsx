import React from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { NotFound } from "features/NotFound";
import { QuestionList } from "../QuestionList";
import { useToggleQuestionary } from "./useToggleQuestionary";
import { useDomain } from "./useDomain";
import { useQuestionList } from "../QuestionList/useQuestionList";
import { useAppSelector } from 'redux/hooks';


export default function Questionary() {
  const { visible, close } = useToggleQuestionary();
  const { isFetching, isError, domain, domainTitle, resetDomain } = useDomain();
  const { isLoading, questions, flushQuestions } = useQuestionList(domain?.id);
  const { activeQuestion } = useAppSelector(state => state.questions);
  const { t } = useTranslation();

  const hideQuestionary = (): void => {
    const question = questions.find(q => q.number === activeQuestion);
    const isPending = question?.choosenAnswer && !question.isCompleted;

    if (isPending) {
      const leave = window.confirm(t("alerts.ask_close_questionary"));
      if (!leave) return;
    }

    resetDomain();
    flushQuestions();
    close();
  }

  return (
    <AppDrawer
      placement="right"
      title={domainTitle}
      visible={visible}
      onClose={hideQuestionary}
      forceRender
      destroyOnClose

      // Placeholder for QuestionList pagination 
      footer={<></>}
      footerStyle={{
        height: 50
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
              onFallback={hideQuestionary} 
            />
          ) : (
            <QuestionList questions={questions} />
          )}
        </Skeleton>
      )}
    </AppDrawer>
  );
}

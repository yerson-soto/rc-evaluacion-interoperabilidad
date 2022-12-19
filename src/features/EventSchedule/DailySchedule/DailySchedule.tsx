import React from "react";
import { Modal, Tag, Timeline, Typography, Button, Spin, Empty } from "antd";
import { useToggleParam } from "library/hooks/useToggleParam";
import { useDailySchedule } from "./useDailySchedule";
import { useTranslation } from "react-i18next";
import { Evaluation } from "library/models/Evaluation";
import { keys } from "library/common/constants";
import { useAppSelector } from "redux/hooks";
import { UserType } from "library/common/enums";
import { AddEvaluation } from "features/EvaluationList/AddEvaluation";

import moment from "moment";
import classes from "./DailySchedule.module.css";
import { Link } from "react-router-dom";
import { paths } from "../../../library/common/constants";

export default function DailySchedule() {
  const { visible, paramValue, setClose } = useToggleParam(keys.viewParamName);
  const { schedule, isLoading } = useDailySchedule(paramValue);
  const { t } = useTranslation();

  const timelineRender = (event: Evaluation, key: number) => {
    const time = moment(event.dateStart).format("HH:mm");

    return (
      <Timeline.Item key={key}>
        <Link
          to={paths.admin.evaluations.detail.reverse({ uid: event.uid })}
          className={classes.label}
        >
          {time} - {event.organization.name}
        </Link>

        <Typography.Paragraph style={{ marginBottom: 5 }}>
          {t("labels.manager")} {event.manager.fullName}
        </Typography.Paragraph>

        <Tag color={event.statusVerbose}>{event.statusLabel}</Tag>
      </Timeline.Item>
    );
  };

  return (
    <DailyScheduleModal
      day={paramValue as string}
      visible={visible}
      onClose={setClose}
    >
      {isLoading ? (
        <Spin />
      ) : schedule ? (
        <Timeline>{schedule?.events.map(timelineRender)}</Timeline>
      ) : (
        <Empty
          description={t("alerts.daily_schedule_empty")}
          imageStyle={{
            height: 60,
          }}
        />
      )}
    </DailyScheduleModal>
  );
}

interface DailyScheduleModalProps {
  visible: boolean;
  day: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DailyScheduleModal = (props: DailyScheduleModalProps) => {
  const { t } = useTranslation();
  const { day, visible, onClose, children } = props;
  const userType = useAppSelector((state) => state.auth.user.type);
  const isAdmin = userType === UserType.Admin;

  const now = moment();
  const dayMoment = moment(day);
  const canCreateEvent = isAdmin && dayMoment >= moment().startOf("day");
  const defaultStartDate = dayMoment
    .add(now.hour(), "hour")
    .add(now.minute(), "minute")
    .add(now.second(), "second");

  const newEvaluationValues = {
    startDate: defaultStartDate,
    isScheduled: true,
  };

  const addEventButton = canCreateEvent ? (
    <AddEvaluation
      defaultValues={newEvaluationValues}
      triggerRender={(trigger) => (
        <Button type="primary" onClick={trigger}>
          {t("buttons.create_event")}
        </Button>
      )}
    />
  ) : null;

  return (
    <Modal
      title={day}
      open={visible}
      onCancel={onClose}
      zIndex={999}
      footer={[
        <Button key="back" onClick={onClose}>
          {t("buttons.close")}
        </Button>,
        addEventButton,
      ]}
    >
      {visible && children}
    </Modal>
  );
};

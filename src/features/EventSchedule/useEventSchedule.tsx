import React, { useState } from "react";
import { Badge, Typography } from "antd";
import { evaluationStatusType } from "library/common/constants";
import { useEventList } from "./useEventList";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";
import { useToggleParam } from "library/hooks/useToggleParam";
import { keys } from "library/common/constants";
import { EventItem } from "./EventItem";

import moment from "moment";
import classes from "./EventSchedule.module.css";

const getMonthData = (value: moment.Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const dateFormat = "YYYY-MM-DD";

const getEntryPoint = (date: moment.Moment) => {
  return date.clone().startOf("month").subtract(15, "day").format();
};

const getTargetPoint = (date: moment.Moment) => {
  return date.clone().endOf("month").add(15, "day").format();
};

export function useEventSchedule() {
  const [dateRange, setDateRange] = useState<[string, string]>([
    getEntryPoint(moment()),
    getTargetPoint(moment()),
  ]);

  const { schedule, isLoading } = useEventList(dateRange);

  const { setOpen } = useToggleParam(keys.viewParamName);

  const handlePanelChange = (date: moment.Moment, mode: CalendarMode): void => {
    if (!(mode === "month")) return;

    const dateStart = getEntryPoint(date);
    const dateEnd = getTargetPoint(date);
    setDateRange([dateStart, dateEnd]);
  };

  const handleDateSelect = (date: moment.Moment) => {
    setOpen(date.format(dateFormat));
  };

  const monthCellRender = (value: moment.Moment) => {
    const num = getMonthData(value);
    // TODO: Add year view
    return num ? (
      <div className={classes.notesMonth}>
        <section className={classes.notesMonthSection}>{num}</section>
        <span>Evaluaciones</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: moment.Moment) => {
    const scheduleItem = schedule.find((item) => {
      return item.date === value.format(dateFormat);
    });

    return (
      <ul className={classes.events}>
        {scheduleItem?.events.map(item => <EventItem item={item} />)}
      </ul>
    );
  };

  return {
    dateRange,
    isLoading,
    monthCellRender,
    dateCellRender,
    handleDateSelect,
    handlePanelChange,
  };
}

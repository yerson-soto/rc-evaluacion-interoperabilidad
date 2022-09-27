import React from "react";
import { Calendar, Card } from "antd";
import { useEventSchedule } from "./useEventSchedule";
import { DailySchedule } from "./DailySchedule";

export default function Schedule() {
  const {
    monthCellRender,
    dateCellRender,
    handleDateSelect,
    handlePanelChange,
  } = useEventSchedule();

  return (
    <Card bodyStyle={{ paddingBottom: 0 }}>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onPanelChange={handlePanelChange}
        onSelect={handleDateSelect}
      />

      <DailySchedule />
    </Card>
  );
}

import React, { useEffect } from "react";
import type { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import moment from "moment";

import "./Schedule.css";
import { AppBox } from "library/components/AppBox";
import { useEvaluationList } from "../EvaluationList/useEvaluationList";
import { useMemo } from "react";
import { Evaluation } from "library/models/Evaluation";
import { evaluationStatusType } from "../../library/common/constants";

const getListData = (value: moment.Moment) => {
  const currentDate = moment().format("DD-MM-YYYY");

  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "(4:10 pm) Ministerio de Administracion Publica",
        },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "Ministerio de Administracion Publica" },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event。。...." },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: moment.Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export default function Schedule() {
  const { evaluations, isLoading } = useEvaluationList();

  const listDatav2 = useMemo(() => {
    const listData: Record<string, Evaluation[]> = {};

    evaluations.forEach((evaluation) => {
      const formattedDate = evaluation.dateCreated
        .split(" ")[0]
        .replaceAll("/", "-");

      if (listData[formattedDate]) {
        listData[formattedDate].push(evaluation);
      } else {
        listData[formattedDate] = [evaluation];
      }
    });

    return listData;
  }, [evaluations]);

  const getListDatav2 = (value: moment.Moment) => {
    const neededDate = value.format("DD-MM-YYYY");
    return listDatav2[neededDate];
  };

  const monthCellRender = (value: moment.Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: moment.Moment) => {
    const listData = getListDatav2(value);
    return (
      <ul className="events">
        {listData?.map((item) => (
          <li key={item.uid}>
            <Badge
              status={evaluationStatusType[item.status] as any}
              text={
                <span>
                  <strong>{item.dateCreated.split(" ")[1]}</strong>-{" "}
                  {item.organization.name}
                </span>
              }
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
      onPanelChange={(date, mode) => {
        console.log(date.calendar(), mode)
      }}
    />
  );
}

import React from "react";
import { Badge, Typography } from "antd";
import { Evaluation } from "library/models/Evaluation";
import { evaluationStatusType } from "library/common/constants";

import moment from "moment";
import classes from "./EventItem.module.css";

interface EventItemProps {
  item: Evaluation;
}

export default function cellItemRender({ item }: EventItemProps) {
  const label = evaluationStatusType[item.status] as any;
  const time = moment(item.dateCreated).format("HH:mm");

  return (
    <li key={item.uid}>
      <Badge
        className={classes.eventBadge}
        status={label}
        text={
          <Typography.Text className={classes.eventText}>
            <strong>({time})</strong> {item.organization.name}
          </Typography.Text>
        }
      />
    </li>
  );
}

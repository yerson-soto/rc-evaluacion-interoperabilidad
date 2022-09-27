import React from "react";
import { useTranslation } from "react-i18next";
import { Badge, Typography } from "antd";
import { Evaluation } from "library/models/Evaluation";
import { evaluationStatus } from "library/common/constants";

import moment from "moment";
import classes from "./DateCellItem.module.css";

interface DateCellItemProps {
  item: Evaluation;
}

export default function DateCellItem({ item }: DateCellItemProps) {
  const { t } = useTranslation();
  const label = evaluationStatus[item.status] as any;
  const isOld = moment(item.dateStart) < moment();
  const time = isOld ? t("labels.done") : moment(item.dateStart).format("HH:mm");

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

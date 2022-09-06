import React from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Card, List, Progress, Typography } from "antd";
import { AppBox } from "library/components/AppBox";
import { Domain } from "library/models/Domain";
import { getContrastColor } from "library/helpers/contrast-color";

import classes from "./DomainItem.module.css";

interface DomainItemProps {
  domain: Domain;
  onClick?: () => void;
}

export default function DomainItem(props: DomainItemProps) {
  const { domain, onClick } = props;

  const { t } = useTranslation();

  const textColor = getContrastColor(domain.color, "#ffffff", "#505050");

  return (
    <List.Item className={classes.item} onClick={onClick}>
      <Card
        className={classes.card}
        bordered
        cover={
          <AppBox
            className={classes.cover}
            style={{
              backgroundColor: domain.color,
            }}
          >
            <Typography.Text
              style={{
                color: textColor,
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              {t("labels.domain")} {domain.name}
            </Typography.Text>
          </AppBox>
        }
      >
        <List.Item.Meta
          title={domain.name}
          description={<Progress percent={30} />}
          avatar={<Avatar className={classes.avatar}>{domain.acronym}</Avatar>}
        />
      </Card>
    </List.Item>
  );
}

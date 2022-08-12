import React from "react";
import { Collapse, Empty, Skeleton, Space, Tag, Typography } from 'antd';
import { Domain } from "library/models/Domain";
import { AppBox } from "library/components/AppBox";
import { useCriteriaByDomain } from "../useCriteriaByDomain";
import { LevelDefinition } from "../LevelDefinition";
import { useTranslation } from 'react-i18next';

import classes from "./CriterionPanel.module.css";
import "./CriterionPanel.css";

interface CriterionPanelProps {
  domain: Domain;
}

export default function CriterionPanel({ domain }: CriterionPanelProps) {
  const { isLoading, criterions } = useCriteriaByDomain(domain.id);
  const { t } = useTranslation();

  return (
    <Skeleton loading={isLoading} paragraph={{ rows: 6 }} active>
      {criterions.length > 0 ? (
        <Collapse
          accordion
          bordered={false}
          defaultActiveKey="1"
          expandIconPosition="end"
        >
          {criterions.map((criterion) => (
            <Collapse.Panel
              key={criterion.id}
              className={classes.panel}
              header={
                <AppBox className={classes.panelHeader}>
                  <Typography.Text>{criterion.name}</Typography.Text>

                  <Space wrap>
                    {criterion.lineaments.map((value) => (
                      <Tag color="orange" key={value.id}>
                        {value.nomenclature}
                      </Tag>
                    ))}
                  </Space>
                </AppBox>
              }
            >
              <AppBox className={classes.panelBox}>
                <LevelDefinition criterion={criterion} />
              </AppBox>
            </Collapse.Panel>
          ))}
        </Collapse>
      ) : (
        <Empty description={t("empty.criteria")} />
      )}
    </Skeleton>
  );
}

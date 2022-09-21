import React from "react";
import { Badge, Descriptions, Typography, Button } from 'antd';
import { useTranslation } from "react-i18next";
import { Row, Col } from "antd/lib/grid";
import { Evaluation } from "library/models/Evaluation";
import {
  evaluationStatusLabels,
  evaluationStatusType,
} from "library/common/constants";
import Card from "antd/lib/card/Card";
import Progress from "antd/es/progress";
import classes from "./Summary.module.css";
import { useFinishEvaluation } from '../useFinishEvaluation';

interface SummaryProps {
  evaluation: Evaluation;
}

export default function Summary(props: SummaryProps) {
  const { finishEvaluation, isLoading } = useFinishEvaluation();
  const { evaluation } = props;
  const { t } = useTranslation();

  const status = evaluationStatusLabels[evaluation.status];
  const statusType = evaluationStatusType[evaluation.status];

  // TODO: Increment score when user selects response
  return (
    <Card 
      title={evaluation.nomenclature} 
      bordered={false} 
      extra={
        <Button type="primary" 
          onClick={() => finishEvaluation(evaluation.uid)} 
          loading={isLoading}
        >
          Finalizar
        </Button>
      }
    >
      <Row gutter={[16, 16]}>
        <Col
          className={classes.progressCol}
          xs={{ span: 10, offset: 7 }}
          lg={{ span: 6, offset: 0 }}
          xl={{ span: 4 }}
        >
          <Progress
            type="circle"
            percent={(evaluation.score * 100) / 5}
            // percent={evaluation.score}
            format={() => evaluation.score}
            strokeColor={evaluation.indicatorColor}
          />
        </Col>

        <Col 
          xs={{ span: 24 }} 
          lg={{ span: 18 }} 
          xl={{ span: 16 }}
        >
          <Descriptions
            column={{ xs: 1, sm: 2, md: 3, lg: 2, xl: 3 }}
            title={
              <Typography.Title level={5} className={classes.title}>
                {evaluation.organization.name}
              </Typography.Title>
            }
          >
            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label={t("labels.score")}
            >
              {Number(evaluation.score).toFixed(2)} / 5
            </Descriptions.Item>

            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label={t("labels.domain_quantity")}
            >
              4
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label={t("labels.status")}
            >
              <Badge status={statusType as any} /> {status}
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label={t("labels.manager")}
            >
              {evaluation.user.fullName}
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label={t("labels.created_date")}
            >
              {evaluation.dateCreated}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
}

import React from "react";
import { Badge, Descriptions, Typography, Button } from "antd";
import { useTranslation } from "react-i18next";
import { Row, Col } from "antd/lib/grid";
import { Evaluation } from "library/models/Evaluation";
import { useFinishEvaluation } from "../useFinishEvaluation";

import Card from "antd/lib/card/Card";
import Progress from "antd/es/progress";
import classes from "./Summary.module.css";
import { EvaluationStatus } from 'library/common/enums';
import { useAppSelector } from '../../../redux/hooks';

interface SummaryProps {
  evaluation: Evaluation;
}
// Format dateStart, dateEnd, datePending
export default function Summary(props: SummaryProps) {
  const { finishEvaluation, isLoading } = useFinishEvaluation();
  const totalDomains = useAppSelector(state => state.domains.results.length);
  const { evaluation } = props;
  const { t } = useTranslation();
  
  // TODO: Increment score when user selects response
  // TODO: Remove Finish button when is finished

  const canFinish = ![EvaluationStatus.Scheduled, EvaluationStatus.Completed].includes(evaluation.status);
  const isCompleted = EvaluationStatus.Completed === evaluation.status;
  
  return (
    <Card
      title={evaluation.nomenclature}
      bordered={false}
      extra={canFinish && (
        <Button
          type="primary"
          onClick={() => finishEvaluation(evaluation.uid)}
          loading={isLoading}
        >
          Finalizar
        </Button>
      )}
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
            strokeColor={evaluation.scoreColor}
          />
        </Col>

        <Col xs={{ span: 24 }} lg={{ span: 18 }} xl={{ span: 16 }}>
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
              {totalDomains}
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label={t("labels.status")}
            >
              <Badge 
                status={evaluation.statusVerbose as any} 
                text={evaluation.statusLabel} 
              /> 
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label={t("labels.manager")}
            >
              {evaluation.manager.fullName}
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ fontWeight: "bold" }}
              label={t("labels.created_date")}
            >
              {evaluation.dateStartReadable}
            </Descriptions.Item>
            {isCompleted && (
              <Descriptions.Item
                labelStyle={{ fontWeight: "bold" }}
                label={t("labels.completed_date")}
              >
                {evaluation.dateEndReadable}
              </Descriptions.Item>
              )}
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
}

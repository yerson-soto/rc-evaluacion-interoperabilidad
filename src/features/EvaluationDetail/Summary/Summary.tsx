import React from "react";
import {
  Badge,
  Card,
  Col,
  Descriptions,
  Progress,
  Row,
  Space,
  Tag,
} from "antd";
import { AppBox } from "library/components/AppBox";

import classes from "./Summary.module.css";
import { Evaluation } from "library/models/Evaluation";

interface SummaryProps {
  evaluation: Evaluation;
}

export default function Summary(props: SummaryProps) {
  const { evaluation } = props;

  return (
    <Card>
      <Row 
      // gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col xs={{ span: 10, offset: 7 }} lg={{ span: 4, offset: 0 }} className={classes.progressCol}>
          <Progress
            type="circle"
            percent={(evaluation.score * 100) / 5}
            format={() => evaluation.score}
          />
        </Col>
        
        {/* <Col span={24} className={classes.progressCol}>
          <Progress
            type="circle"
            percent={(evaluation.score * 100) / 5}
            format={() => evaluation.score}
          />
        </Col> */}
        <Col xs={{ span: 24 }} lg={{ span: 20 }}>
          <Descriptions title={evaluation.organization.name}>
            <Descriptions.Item label="Puntuacion">
              {evaluation.score}
            </Descriptions.Item>
            <Descriptions.Item label="Creada en">
              {evaluation.dateCreated}
            </Descriptions.Item>
            <Descriptions.Item label="Estado">
              <Badge status="processing" /> Pendiente
            </Descriptions.Item>
            <Descriptions.Item label="Usuario">
              {evaluation.user.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Cantidad de Dominios">
              4
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
}

import React from "react";
import { Badge, Card, Descriptions, Progress, Space, Tabs, Tag } from "antd";
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
      <Space size="large">
        <Progress type="circle" 
          percent={evaluation.score * 100 / 5} 
          format={() => evaluation.score} 
        />
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
          <Descriptions.Item label="Usuario">{evaluation.user.fullName}</Descriptions.Item>
          <Descriptions.Item label="Cantidad de Dominios">4</Descriptions.Item>
        </Descriptions>
      </Space>
    </Card>
  );
}

import React from "react";
import { Badge, Card, Descriptions, Progress, Tabs } from "antd";
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
      <Descriptions title={evaluation.organization.name}>
        <Descriptions.Item label="Puntuacion">
          {evaluation.score}
        </Descriptions.Item>
        <Descriptions.Item label="Creada en">
          {evaluation.dateCreated}
        </Descriptions.Item>
        <Descriptions.Item label="Dominios">4</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>

      <Tabs defaultActiveKey="1" onChange={() => {}}>
        <Tabs.TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}

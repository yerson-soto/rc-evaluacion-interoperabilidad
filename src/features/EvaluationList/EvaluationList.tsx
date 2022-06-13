import React from "react";
import { useNavigate } from "react-router-dom";
import { useEvaluationList } from "./useEvaluationList";
import { Space, PageHeader, Typography, Card } from "antd";
import { EvaluationItem } from "./EvaluationItem";
import { ActiveEvaluation } from "./ActiveEvaluation";

import { List, Avatar, Grid } from "antd";
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { Evaluation } from "library/models/Evaluation";

const { useBreakpoint } = Grid;

const fakeData: Evaluation[] = [
  { 
    uuid: 'abcd-efgh',
    dateCreated: '2022-06-05',
    organization: {
      id: 1,
      name: 'Ministerio de Industria y Comercio',
      acronym: 'MIYPC'
    },
    domains: [

    ]
  },
  { 
    uuid: 'abcd-efgh-2',
    dateCreated: '2022-06-05',
    organization: {
      id: 1,
      name: 'Ministerio de Administracion Publica',
      acronym: 'EFGH'
    },
    domains: [
      
    ]
  },
  { 
    uuid: 'abcd-efgh-3',
    dateCreated: '2022-06-05',
    organization: {
      id: 1,
      name: 'Ministerio de Turismo',
      acronym: 'ABCD'
    },
    domains: [
      
    ]
  }
]

export default function EvaluationList() {
  const navigate = useNavigate();

  const { xl } = useBreakpoint();

  const { isLoading, evaluations } = useEvaluationList();

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <PageHeader
        style={{ padding: 0 }}
        onBack={() => navigate("/evaluaciones")}
        title="Evaluaciones"
        subTitle="Lista de evaluaciones tomadas..."
      />

      <ActiveEvaluation />

      {/* <Space direction="vertical" style={{ width: "100%" }}>
        {evaluations.map((evaluation, idx) => (
          <EvaluationItem key={idx} evaluation={evaluation} />
        ))}
      </Space> */}

      <Card>
        <List
          loading={isLoading}
          itemLayout={xl ? "horizontal" : "vertical"}
          size="large"
          dataSource={fakeData}
          footer={
            <div>
              <b>{evaluations.length}</b> evaluaciones
            </div>
          }
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          renderItem={(evaluation) => (
            <EvaluationItem key={evaluation.uuid} evaluation={evaluation} />
          )}
        />
      </Card>
    </Space>
  );
}

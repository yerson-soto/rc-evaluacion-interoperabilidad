import React from "react";
import { useNavigate } from "react-router-dom";
import { useEvaluationList } from "./useEvaluationList";
import { Space, PageHeader, Card } from "antd";
import { EvaluationItem } from "./EvaluationItem";
import { ActiveEvaluation } from "./ActiveEvaluation";

import { List, Grid } from "antd";

import { Evaluation } from "library/models/Evaluation";

const { useBreakpoint } = Grid;

const fakeData: Evaluation[] = [
  {
    uid: "abcd-efgh",
    dateCreated: "2022-06-05",
    organization: {
      id: 1,
      name: "Ministerio de Industria y Comercio",
      acronym: "MIYPC",
    },
    domains: [],
    score: 0.75,
  },
  {
    uid: "abcd-efgh-asd",
    dateCreated: "2022-06-05",
    organization: {
      id: 1,
      name: "Ministerio de Industria y Comercio",
      acronym: "MIYPC",
    },
    domains: [],
    score: 0,
  },
  {
    uid: "abc3d-efgh",
    dateCreated: "2022-06-05",
    organization: {
      id: 2,
      name: "Ministerio de Industria y Comercio",
      acronym: "MIYPC",
    },
    domains: [],
    score: 2.5,
  },
  {
    uid: "abc3d-e34-fgh",
    dateCreated: "2022-06-05",
    organization: {
      id: 2,
      name: "Ministerio de Industria y Comercio",
      acronym: "MIYPC",
    },
    domains: [],
    score: 3,
  },
  {
    uid: "abcd-efgh-2",
    dateCreated: "2022-06-05",
    organization: {
      id: 3,
      name: "Ministerio de Administracion Publica",
      acronym: "EFGH",
    },
    domains: [],
    score: 4.1,
  },
  {
    uid: "abcd-efgh-3",
    dateCreated: "2022-06-05",
    organization: {
      id: 4,
      name: "Ministerio de Turismo",
      acronym: "ABCD",
    },
    domains: [],
    score: 5,
  },
];

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

      <ActiveEvaluation evaluation={fakeData[0]} />

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
            pageSize: 10,
          }}
          renderItem={(evaluation) => (
            <EvaluationItem key={evaluation.uid} evaluation={evaluation} />
          )}
        />
      </Card>
    </Space>
  );
}

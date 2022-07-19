import React, { useState } from "react";
import { List, Grid } from "antd";
import { useNavigate } from "react-router-dom";
import { useEvaluationList } from "./useEvaluationList";
import { Space, PageHeader, Card, Empty, Button } from "antd";
import { EvaluationItem } from "./EvaluationItem";
import { ActiveEvaluation } from "./ActiveEvaluation";
import { PlusOutlined } from "@ant-design/icons";

import { Evaluation } from "library/models/Evaluation";
import { useTranslation } from "react-i18next";
import { PaginationFooter } from "library/components/PaginationFooter";
import { AddEvaluation } from "./AddEvaluation";
import { EvaluationFilter } from "./EvaluationFilter";

const { useBreakpoint } = Grid;

// const fakeData: Evaluation[] = [
//   {
//     uid: "abcd-efgh",
//     dateCreated: "2022-06-05",
//     organization: {
//       id: 1,
//       name: "Ministerio de Industria y Comercio",
//       acronym: "MIYPC",
//     },
//     score: 0.75,
//   },
//   {
//     uid: "abcd-efgh-asd",
//     dateCreated: "2022-06-05",
//     organization: {
//       id: 1,
//       name: "Ministerio de Industria y Comercio",
//       acronym: "MIYPC",
//     },
//     score: 0,
//   },
//   {
//     uid: "abc3d-efgh",
//     dateCreated: "2022-06-05",
//     organization: {
//       id: 2,
//       name: "Ministerio de Industria y Comercio",
//       acronym: "MIYPC",
//     },
//     score: 2.5,
//   },
//   {
//     uid: "abc3d-e34-fgh",
//     dateCreated: "2022-06-05",
//     organization: {
//       id: 2,
//       name: "Ministerio de Industria y Comercio",
//       acronym: "MIYPC",
//     },
//     score: 3,
//   },
//   {
//     uid: "abcd-efgh-2",
//     dateCreated: "2022-06-05",
//     organization: {
//       id: 3,
//       name: "Ministerio de Administracion Publica",
//       acronym: "EFGH",
//     },
//     score: 4.1,
//   },
//   {
//     uid: "abcd-efgh-3",
//     dateCreated: "2022-06-05",
//     organization: {
//       id: 4,
//       name: "Ministerio de Turismo",
//       acronym: "ABCD",
//     },
//     score: 5,
//   },
// ];

export default function EvaluationList() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const { xl } = useBreakpoint();

  const { t } = useTranslation();

  const { isLoading, evaluations } = useEvaluationList();

  const showModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <PageHeader
        style={{ padding: 0 }}
        onBack={() => navigate("/evaluaciones")}
        title="Evaluaciones"
        subTitle="Lista de evaluaciones tomadas..."
        extra={
          <Button
            type="primary"
            size="large"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={showModal}
          />
        }
      />

      <AddEvaluation isOpen={visible} onClose={closeModal} />

      {evaluations.length > 0 && (
        <ActiveEvaluation evaluation={evaluations[0]} />
      )}

      <EvaluationFilter />

      <Card>
        <List<Evaluation>
          loading={isLoading}
          itemLayout={xl ? "horizontal" : "vertical"}
          size="large"
          dataSource={evaluations}
          footer={
            <PaginationFooter
              total={evaluations.length}
              label={t("pagination.evaluations")}
            />
          }
          pagination={{
            pageSize: 5,
            total: 50
          }}
          locale={{
            emptyText: <Empty description={t("empty.evaluations")} />,
          }}
          renderItem={(evaluation) => (
            <EvaluationItem key={evaluation.uid} evaluation={evaluation} />
          )}
        />
      </Card>
    </Space>
  );
}

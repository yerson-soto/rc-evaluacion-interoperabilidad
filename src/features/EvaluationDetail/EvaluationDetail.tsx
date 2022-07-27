import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, Button, Descriptions } from "antd";

import { AppBox } from "library/components/AppBox";

import { Badge } from "antd";

import "./EvaluationDetail.module.css";

export default function EvaluationDetail() {
  const navigate = useNavigate();

  return (
    <AppBox>
      <PageHeader
        style={{ padding: 0 }}
        onBack={() => navigate("/evaluaciones")}
        title="Detalle de Evaluacion"
        subTitle="Este dominio evalúa las habilidades..."
        extra={[
          <Button key="2">Evaluar</Button>,
          <Button key="1" type="primary">
            Finalizar
          </Button>,
        ]}
      >
        <Descriptions bordered>
          <Descriptions.Item label="Fecha">5 de mayo de 2022</Descriptions.Item>
          <Descriptions.Item label="Estado">Pendiente</Descriptions.Item>
          <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
          <Descriptions.Item label="Order time">
            2018-04-24 18:00:00
          </Descriptions.Item>
          <Descriptions.Item label="Usage Time" span={2}>
            2019-04-24 18:00:00
          </Descriptions.Item>
          <Descriptions.Item label="Estado" span={3}>
            <Badge status="processing" text="Running" />
          </Descriptions.Item>
          <Descriptions.Item label="Negotiated Amount">
            $80.00
          </Descriptions.Item>
          <Descriptions.Item label="Puntuacion">20.00</Descriptions.Item>
          <Descriptions.Item label="Official Receipts">
            $60.00
          </Descriptions.Item>
          <Descriptions.Item label="Lineamientos">
            LI.I15D.OG.01
            <br />
            LI.I15D.OG.02
            <br />
            LI.I15D.OG.03
            <br />
            LI.I15D.OG.04
            <br />
            LI.I15D.OG.05
            <br />
            LI.I15D.OG.01
            <br />
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </AppBox>
  );
}

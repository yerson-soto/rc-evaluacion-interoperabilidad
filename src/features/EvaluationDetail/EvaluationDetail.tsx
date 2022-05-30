import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PageHeader,
  Button,
  Descriptions,
  Typography,
  Tag,
  Space,
  Input,
} from "antd";

import { Box } from "library/components/Box";
import { CustomCard } from "library/components/CustomCard";
import { AnswerRadio } from "library/components/AnswerRadio";

import { Radio, Badge  } from "antd";
import type { RadioChangeEvent } from "antd";

import "./EvaluationDetail.module.css";

const onChange = (e: RadioChangeEvent) => {
  console.log(`radio checked:${e.target.value}`);
};

export default function EvaluationDetail() {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Box>
      <PageHeader
        style={{ padding: 0 }}
        onBack={() => navigate("/evaluaciones")}
        title="Dominio Organizacional"
        subTitle="Este dominio evalúa las habilidades..."
        extra={[
          <Button key="3">Operation</Button>,
          <Button key="2">Operation</Button>,
          <Button key="1" type="primary">
            Primary
          </Button>,
        ]}
      >
        <Descriptions bordered>
    <Descriptions.Item label="Fecha">5 de mayo de 2022</Descriptions.Item>
    <Descriptions.Item label="Estado">Pendiente</Descriptions.Item>
    <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
    <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
    <Descriptions.Item label="Usage Time" span={2}>
      2019-04-24 18:00:00
    </Descriptions.Item>
    <Descriptions.Item label="Status" span={3}>
      <Badge status="processing" text="Running" />
    </Descriptions.Item>
    <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
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
      LI.I15D.OG.01<br />
    </Descriptions.Item>
  </Descriptions>
      </PageHeader>

      <CustomCard title="Liderazgo del Marco de Interoperabilidad" extra={
        <div style={{ marginBottom: 10 }}>
        <Tag about="asdasdas" color="#2db7f5">LI.I15D.05.01</Tag>
        <Tag color="#87d068">LI.I15D.05.02</Tag>
        <Tag color="#108ee9">LI.I15D.05.03</Tag>
      </div>
      } style={{ marginTop: 30 }}>
        {/* <div style={{ marginBottom: 10 }}>
          <Tag color="#2db7f5">LI.I15D.05.01</Tag>
          <Tag color="#87d068">LI.I15D.05.02</Tag>
          <Tag color="#108ee9">LI.I15D.05.03</Tag>
        </div>
        <Typography.Title level={3}>
          Liderazgo del Marco de Interoperabilidad
        </Typography.Title> */}

        <div>
          <AnswerRadio />
          <AnswerRadio />
          <AnswerRadio />
          <AnswerRadio />
          <AnswerRadio />
        </div>
      </CustomCard>

      <CustomCard style={{ marginTop: 30 }}>
        <div style={{ marginBottom: 10 }}>
          <Tag color="#2db7f5">LI.I15D.OG.01</Tag>
          <Tag color="#87d068">LI.I15D.OG.02</Tag>
          <Tag color="#108ee9">LI.I15D.OG.03</Tag>
        </div>
        <Typography.Title level={3}>Cultura organizacional</Typography.Title>

        <div>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>
                No existe un responsable de los servicios de intercambio de
                información.
              </Radio>
              <Radio value={2}>
                Existen varias personas responsables de los servicios de
                intercambio de información.
              </Radio>
              <Radio value={3}>
                Existe un único responsable de intercambio de información pero
                no es formal.
              </Radio>
              <Radio value={4}>
                Existe un responsable de los servicios de intercambio de
                información y es reconocido por toda la entidad formalmente.
              </Radio>
              <Radio value={5}>
                Existe un responsable de los servicios de intercambio de
                información y lidera a toda la organización en la implementación
                del Marco de interoperabilidad.
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </CustomCard>
    </Box>
  );
}

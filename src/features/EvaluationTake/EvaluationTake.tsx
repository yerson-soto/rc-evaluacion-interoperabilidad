import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  PageHeader,
  Collapse,
  Row,
  Col,
  Typography,
  Tag,
  Card,
  Space,
  Affix,
} from "antd";

import { Box } from "library/components/Box";
import { CustomCard } from "library/components/CustomCard";
import { AnswerRadio } from "features/EvaluationTake/AnswerRadio";

import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { Score } from "library/components/Score";
import { DomainList } from "./DomainList";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default function EvaluationTake() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [value, setValue] = React.useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Box>
      <PageHeader
        onBack={() => navigate("/evaluaciones")}
        title={t("headings.complete_evaluation")}
      />

      <Row gutter={40}>
        <Col span={16}>
          <DomainList />

          {/* <Collapse bordered={false} defaultActiveKey={['1']} ghost>
          <Collapse.Panel header="Dominio Organizacional" key="1" showArrow={false}>
          <Box style={{ padding: "20px" }}>
                <Box>
                <Typography.Text style={{ marginRight: '15px' }}>LI.I15D.OG.01</Typography.Text>
                <Typography.Text style={{ marginRight: '15px' }}>LI.I15D.OG.01</Typography.Text>
                <Typography.Text style={{ marginRight: '15px' }}>LI.I15D.OG.01</Typography.Text>
                </Box>
                <Typography.Text style={{ fontSize: '18px', fontWeight: 500 }}>Liderazgo del Marco de Interoperabilidad</Typography.Text>

                <Space style={{ marginTop: '20px' }} direction="vertical" size="middle">
                  <AnswerRadio color="#fce5d8" label="No existe un responsable de los servicios de intercambio de información" />
                  <AnswerRadio color="#fff2cd" label="Existen varias personas responsables de los servicios de intercambio de información" />
                  <AnswerRadio color="#fefed8" label="Existe un único responsable de intercambio de información pero no es formal"/>
                  <AnswerRadio color="#e2efdb" label="La entidad  tiene documentada toda la información de entrada y de salida de sus servicios y se encuentra actualizada. Esta información incluye todos los tipos de dato que se utilizan en los servicios de intercambio de información. La caracterización de los servicios incluye los casos de prueba" />
                  <AnswerRadio color="#c6e0b3" label="Existe un responsable de los servicios de intercambio de información y lidera a toda la organización en la implementación del Marco de interoperabilidad" />
                </Space>
                
              </Box>
          </Collapse.Panel>
          <Collapse.Panel header="Dominio Semantico" key="2">
            {text}
          </Collapse.Panel>
          <Collapse.Panel header="Dominio Politico" key="3">
            {text}
          </Collapse.Panel>
        </Collapse> */}
        </Col>

        <Col flex="auto">
          
            <CustomCard style={{ 
              position: 'sticky',
              top: '20px'
            }}>
              <Score value={5.0} />
            </CustomCard>
         
        </Col>
      </Row>

      {/* <Space direction="vertical">
        <CustomCard style={{ marginTop: 30, borderRadius: 10 }}>
          <Space>
            <Typography.Title level={5}>
              Cultura organizacional
            </Typography.Title>

            <div style={{ marginBottom: 10 }}>
              <Tag color="red">LI.I15D.OG.01</Tag>
              <Tag color="orange">LI.I15D.OG.02</Tag>
              <Tag color="blue">LI.I15D.OG.03</Tag>
            </div>
          </Space>

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
                  información y lidera a toda la organización en la
                  implementación del Marco de interoperabilidad.
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </CustomCard>

        <CustomCard style={{ marginTop: 30, borderRadius: 10 }}>
          <Space>
            <Typography.Title level={5}>
              Cultura organizacional
            </Typography.Title>

            <div style={{ marginBottom: 10 }}>
              <Tag color="red">LI.I15D.OG.01</Tag>
              <Tag color="orange">LI.I15D.OG.02</Tag>
              <Tag color="blue">LI.I15D.OG.03</Tag>
            </div>
          </Space>

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
                  información y lidera a toda la organización en la
                  implementación del Marco de interoperabilidad.
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </CustomCard>

        <CustomCard style={{ marginTop: 30 }}>
          <Space>
            <Typography.Title level={5}>
              Cultura organizacional
            </Typography.Title>

            <div style={{ marginBottom: 10 }}>
              <Tag color="red">LI.I15D.OG.01</Tag>
              <Tag color="orange">LI.I15D.OG.02</Tag>
              <Tag color="blue">LI.I15D.OG.03</Tag>
            </div>
          </Space>

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
                  información y lidera a toda la organización en la
                  implementación del Marco de interoperabilidad.
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </CustomCard>
      </Space> */}
    </Box>
  );
}

import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Row, Col, Card } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";


export default function ActiveEvaluation() {
  const navigate = useNavigate();

  return (
    <Card bordered={false}>
      <Row align="middle" gutter={[5, 15]}>
        <Col xs={24} md={20} lg={22}>
          <Typography.Title level={4}>Evaluacion Actual</Typography.Title>

          <Typography.Text>2022 de mayo de 2022</Typography.Text>
        </Col>

        <Col flex="auto">
          <Button
            style={{ width: "100%" }}
            type="primary"
            icon={<ArrowRightOutlined />}
            size="large"
            onClick={() => navigate("/evaluaciones/abcd/complete")}
          >
            Iniciar
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Row, Col, Card, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Evaluation } from "library/models/Evaluation";

interface ActiveEvaluationProps {
  evaluation: Evaluation;
}

export default function ActiveEvaluation(props: ActiveEvaluationProps) {
  const { evaluation } = props;
  
  const navigate = useNavigate();

  const goToEvaluation = (): void => navigate(`/evaluaciones/${evaluation.uid}/iniciar`) 

  return (
    <Card bordered={false}>
      <Row align="middle" gutter={[5, 15]}>
        <Col xs={24} md={20} lg={22}>
          <Typography.Title level={4}>
            Evaluacion Actual

            <Tag style={{ marginLeft: '.5rem' }} color="warning">Pendiente</Tag>
          </Typography.Title>
          

          <Typography.Text>{evaluation.dateCreated}</Typography.Text>
        </Col>

        <Col flex="auto">
          <Button
            style={{ width: "100%" }}
            type="primary"
            icon={<ArrowRightOutlined />}
            size="large"
            onClick={goToEvaluation}
          >
            Iniciar
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

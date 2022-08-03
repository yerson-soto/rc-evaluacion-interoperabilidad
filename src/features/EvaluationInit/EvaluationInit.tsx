import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Affix, Button, Card, Col, Row } from "antd";
import { DomainList } from "./DomainList";
import { Questionary } from "./Questionary";
import { AppBox } from "library/components/AppBox";
import { useEvaluationInit } from "./useEvaluationInit";
import { withIfDirective } from "library/hocs/withIfDirective";
import { QuestionaryProps } from "./Questionary/Questionary";
import { Summary } from "./Summary";
import { useEvaluation } from "./useEvaluation";

const QuestionaryIf = withIfDirective<QuestionaryProps>(Questionary);

export default function EvaluationInit() {
  const { isOpen, domain, setOpen, setClose, afterClosed } =
    useEvaluationInit();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { uid } = useParams();

  const { fetchEvaluation, evaluation } = useEvaluation();

  React.useEffect(() => {
    fetchEvaluation(uid as any)
  }, [uid])

  return (
    <AppBox>
      {evaluation && <Summary evaluation={evaluation} />}
      <Row gutter={18}>
        <Col md={18}>
          {/* <DomainList onEvaluate={setOpen} onReset={() => {}} /> */}

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/800/300"
                  />
                }
                bordered={false}
              >
                <span>Dominio Organizacional</span>

                <Button style={{ marginLeft: 'auto' }}>Evaluar</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/800/300"
                  />
                }
                bordered={false}
              >
                <span>Dominio Organizacional</span>

                <Button style={{ marginLeft: 'auto' }}>Evaluar</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/800/300"
                  />
                }
                bordered={false}
              >
                <span>Dominio Organizacional</span>

                <Button style={{ marginLeft: 'auto' }}>Evaluar</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/800/300"
                  />
                }
                bordered={false}
              >
                <span>Dominio Organizacional</span>

                <Button style={{ marginLeft: 'auto' }}>Evaluar</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/800/300"
                  />
                }
                bordered={false}
              >
                <span>Dominio Organizacional</span>

                <Button style={{ marginLeft: 'auto' }}>Evaluar</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/800/300"
                  />
                }
                bordered={false}
              >
                <span>Dominio Organizacional</span>

                <Button style={{ marginLeft: 'auto' }}>Evaluar</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/800/300"
                  />
                }
                bordered={false}
              >
                <span>Dominio Organizacional</span>

                <Button style={{ marginLeft: 'auto' }}>Evaluar</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/800/300"
                  />
                }
                bordered={false}
              >
                <span>Dominio Organizacional</span>

                <Button style={{ marginLeft: 'auto' }}>Evaluar</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/800/300"
                  />
                }
                bordered={false}
              >
                <span>Dominio Organizacional</span>

                <Button style={{ marginLeft: 'auto' }}>Evaluar</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://picsum.photos/800/300"
                  />
                }
                bordered={false}
              >
                <span>Dominio Organizacional</span>

                <Button style={{ marginLeft: 'auto' }}>Evaluar</Button>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <QuestionaryIf
        if={!!domain}
        isOpen={isOpen}
        domain={domain}
        onClose={setClose}
        onCloseEnd={afterClosed}
      />
    </AppBox>
  );
}

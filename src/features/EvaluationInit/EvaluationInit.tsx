import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  PieChartOutlined,
  AccountBookOutlined,
  AimOutlined,
  SmileOutlined,
  LikeOutlined
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  Affix,
  Button,
  Card,
  Col,
  Row,
  Statistic,
  TabsProps,
  Timeline,
  Typography,
} from "antd";
import { DomainList } from "./DomainList";
import { Questionary } from "./Questionary";
import { AppBox } from "library/components/AppBox";
import { useEvaluationInit } from "./useEvaluationInit";
import { withIfDirective } from "library/hocs/withIfDirective";
import { QuestionaryProps } from "./Questionary/Questionary";
import { Summary } from "./Summary";
import { useEvaluation } from "./useEvaluation";
import { Sticky, StickyContainer } from "react-sticky";

import type { RadioChangeEvent } from "antd";
import { Radio, Tabs } from "antd";

const { TabPane } = Tabs;

const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
  <Sticky topOffset={20}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="site-custom-tab-bar"
        style={{ ...style, zIndex: 1, background: "#fff" }}
      />
    )}
  </Sticky>
);

const QuestionaryIf = withIfDirective<QuestionaryProps>(Questionary);

export default function EvaluationInit() {
  const { isOpen, domain, setOpen, setClose, afterClosed } =
    useEvaluationInit();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { uid } = useParams();

  const { fetchEvaluation, fakeIncrementScore, evaluation } = useEvaluation();

  React.useEffect(() => {
    fetchEvaluation(uid as any);
  }, [uid]);

  return (
    <AppBox>
      {evaluation && <Summary evaluation={evaluation} />}

      <Tabs
        tabBarStyle={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "#ffffff",
          padding: "0 16px",
        }}
        animated
        defaultActiveKey="1"
      >
        <TabPane
          tab={
            <span>
              <AccountBookOutlined />
              Detalles
            </span>
          }
          style={{ overflow: 'hidden' }}
          key="1"
        >
          <Card>
          <Timeline>
            <Timeline.Item color="green">
              Create a services site 2015-09-01
            </Timeline.Item>
            <Timeline.Item color="green">
              Create a services site 2015-09-01
            </Timeline.Item>
            <Timeline.Item color="red">
              <p>Solve initial network problems 1</p>
              <p>Solve initial network problems 2</p>
              <p>Solve initial network problems 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item>
              <p>Technical testing 1</p>
              <p>Technical testing 2</p>
              <p>Technical testing 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item color="gray">
              <p>Technical testing 1</p>
              <p>Technical testing 2</p>
              <p>Technical testing 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item color="gray">
              <p>Technical testing 1</p>
              <p>Technical testing 2</p>
              <p>Technical testing 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item color="#00CCFF" dot={<SmileOutlined />}>
              <p>Custom color testing</p>
            </Timeline.Item>
          </Timeline>
          </Card>
        </TabPane>
        <TabPane
          tab={
            <span>
              <PieChartOutlined />
              Estadísticas
            </span>
          }
          key="2"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Feedback"
                value={1128}
                prefix={<LikeOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic title="Unmerged" value={93} suffix="/ 100" />
            </Col>
          </Row>
        </TabPane>
        <TabPane
          style={{
            padding: "16px 0",
            display: "flex",
            justifyContent: "center",
          }}
          tab={
            <span>
              <AimOutlined />
              Dominios
            </span>
          }
          key="3"
        >
          <DomainList onEvaluate={setOpen} onReset={() => {}} />
        </TabPane>
      </Tabs>

      <QuestionaryIf
        if={!!domain}
        isOpen={isOpen}
        domain={domain}
        onClose={setClose}
        onCloseEnd={afterClosed}
        onChangeLevel={fakeIncrementScore}
      />
    </AppBox>
  );
}

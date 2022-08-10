import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  PieChartOutlined,
  EyeFilled,
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


import { AppBox } from "library/components/AppBox";


import { Summary } from "./Summary";
import { useEvaluation } from "./useEvaluation";
import { Sticky, StickyContainer } from "react-sticky";

import type { RadioChangeEvent } from "antd";
import { Radio, Tabs } from "antd";
import { AppLoader } from "library/components/AppLoader";
import NotFound from '../NotFound/NotFound';
import { EyeOutlined } from '@ant-design/icons';

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

export default function EvaluationDetail() {
  const navigate = useNavigate();
  
  const { t } = useTranslation();
  const { evaluation, isLoading } = useEvaluation();

  if (isLoading) return <AppLoader text={t("loading.fetching_data")} />
  if (!evaluation) return <NotFound />

  return (
    <AppBox>
      <Summary evaluation={evaluation} />

      <Tabs
        tabBarStyle={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "#ffffff",
          padding: "0 16px",
        }}
        defaultActiveKey="1"
        animated
      >
        <TabPane
          tab={
            <span>
              <AimOutlined />
              Dominios
            </span>
          }
          style={{ overflow: 'hidden' }}
          key="1"
        >
          <Card>Detalles</Card>
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
              <EyeFilled />
              Detalles
            </span>
          }
          key="3"
        >
          Domain List
        </TabPane>
      </Tabs>
    </AppBox>
  );
}

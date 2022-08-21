import React from "react";
import { useTranslation } from "react-i18next";
import { Card, Tabs } from "antd";
import { PieChartOutlined, FieldTimeOutlined, AimOutlined } from "@ant-design/icons";
import { AppBox } from "library/components/AppBox";
import { Summary } from "features/EvaluationDetail/Summary";
import { AppLoader } from "library/components/AppLoader";
import { NotFound } from "features/NotFound";
import TableVersion from './MaturityModel/TableVersion/TableVersion';

export default function MaturityModelDesign() {
  const { t } = useTranslation();

  return (
    <AppBox>
      <Summary evaluation={{
        dateCreated: '29-10-2020',
        organization: {
          id: 1,
          name: 'Ministerio de Administracion Publica',
          acronym: 'MAP',
          emailDomain: '@map.gob.do'
        },
        score: 2.1,
        status: 2,
        uid: 'asdas-casdasd-vf2342-adsasd',
        user: {
          email: 'yerson.soto@map.gob.do',
          uid: 'asdasd-342342-sasdas-242342',
          firstName: "Yerson",
          lastName: "Soto",
          fullName: "Yerson Soto",
          identification: "40212355422",
          organization: {
            id: 1,
            name: 'Ministerio de Administracion Publica',
            acronym: 'MAP',
            emailDomain: '@map.gob.do'
          },
          type: 2
        }
      }} />

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
        <Tabs.TabPane
          tab={
            <span>
              <AimOutlined />
              {t("labels.domains")}
            </span>
          }
          key="1"
        >         
          <TableVersion />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <PieChartOutlined />
              {t("labels.statistics")}
            </span>
          }
          key="2"
        >
          <Card>Estadisticas</Card>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FieldTimeOutlined />
              {t("labels.details")}
            </span>
          }
          key="3"
        >
          <Card>Detail</Card>
        </Tabs.TabPane>
      </Tabs>
    </AppBox>
  );
}

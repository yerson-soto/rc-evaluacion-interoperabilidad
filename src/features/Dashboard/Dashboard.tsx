import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Card, Row, Col } from "antd";
import { AppBox } from "library/components/AppBox";

import {
  SignalFilled,
  PieChartFilled,
  AppstoreFilled,
  AlignLeftOutlined,
  AppstoreOutlined,
  CompressOutlined,
  FormOutlined,
  AimOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import classes from "./Dashboard.module.css";
import { paths } from "library/common/constants";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <Row gutter={[30, 30]}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Link to={paths.admin.evaluations.index}>
          <Card
            hoverable
            cover={
              <AppBox className={classes.cardCover} style={{ backgroundColor: '#8b75cd' }}>
                <AppstoreFilled style={{ fontSize: 60, color: "white" }} />
              </AppBox>
            }
          >
            <Card.Meta title={t("nav.evaluations")} description="Administrar Evaluaciones" />
          </Card>
        </Link>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Link to={paths.management.domains.reverse()}>
          <Card
            hoverable
            cover={
              <AppBox className={classes.cardCover} style={{ backgroundColor: '#647fe1' }}>
                <AimOutlined style={{ fontSize: 60, color: "white" }} />
              </AppBox>
            }
          >
            <Card.Meta title={t("nav.domains")} description="Administrar Dominios" />
          </Card>
        </Link>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Link to={paths.management.criterions.reverse()}>

          <Card
            hoverable
            cover={
              <AppBox className={classes.cardCover} style={{ backgroundColor: '#75cdb5' }}>
                <CompressOutlined style={{ fontSize: 60, color: "white" }} />
              </AppBox>
            }
          >
            <Card.Meta title={t("nav.criterions")} description="Administrar Criterios" />
          </Card>
        </Link>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Link to={paths.management.lineaments.reverse()}>

          <Card
            hoverable
            cover={
              <AppBox className={classes.cardCover} style={{ backgroundColor: '#dd6077' }}>
                <AlignLeftOutlined style={{ fontSize: 60, color: "white" }} />
              </AppBox>
            }
          >
            <Card.Meta title={t("nav.lineaments")} description="Administrar Lineamientos" />
          </Card>
        </Link>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Link to={paths.management.levels.reverse()}>

          <Card
            hoverable
            cover={
              <AppBox className={classes.cardCover} style={{ backgroundColor: '#cc75cd' }}>
                <SignalFilled style={{ fontSize: 60, color: "white" }} />
              </AppBox>
            }
          >
            <Card.Meta title={t("nav.levels")} description="Administrar Niveles" />
          </Card>
        </Link>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Link to={paths.management.choices.reverse()}>

          <Card
            hoverable
            cover={
              <AppBox className={classes.cardCover} style={{ backgroundColor: '#ffa03f' }}>
                <FormOutlined style={{ fontSize: 60, color: "white" }} />
              </AppBox>
            }
          >
            <Card.Meta title={t("nav.answers")} description="Administrar Respuestas" />
          </Card>
        </Link>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Link to={paths.management.users.reverse()}>

          <Card
            hoverable
            cover={
              <AppBox className={classes.cardCover} style={{ backgroundColor: '#83cd75' }}>
                <UsergroupAddOutlined style={{ fontSize: 60, color: "white" }} />
              </AppBox>
            }
          >
            <Card.Meta title={t("nav.users")} description="Administrar Usuarios" />
          </Card>
        </Link>
      </Col>
    </Row>
  );
}

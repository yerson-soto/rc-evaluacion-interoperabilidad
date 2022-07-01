import React from "react";
import { Card, Layout, Row, Col } from "antd";
import { Outlet } from "react-router-dom";

import classes from "./AuthPanel.module.css";

export default function AuthPanel() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Layout className={classes.layout}>
      <Layout.Content className={classes.content}>
        <Row className={classes.row}>
          <Col span={24} sm={18} md={12} lg={10} xl={8} xxl={6}>
            <Card className={classes.card}>
              <Outlet />
            </Card>
          </Col>
        </Row>
      </Layout.Content>

      <Layout.Footer className={classes.footer}>
        Copyright &copy; {currentYear} 
        Ministerio de Administración Publica
      </Layout.Footer>
    </Layout>
  );
}

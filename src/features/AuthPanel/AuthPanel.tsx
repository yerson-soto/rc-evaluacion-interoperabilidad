import React from "react";
import { Layout, Row, Col } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from 'main/store';
import { paths } from "library/common/constants";

import classes from "./AuthPanel.module.css";

export default function AuthPanel() {
  const currentYear = new Date().getFullYear();
  // const isLogged = useAppSelector((state) => state.auth.isLogged);
  // const isLoading = useAppSelector(state => state.auth.isLoading);

  // if (isLoading) return <div>Loading...</div>
  // if (isLogged) return <Navigate to={paths.admin} />;

  return (
    <Layout className={classes.layout}>
      <Layout.Content className={classes.content}>
        <Row className={classes.row}>
          <Col span={24} sm={18} md={12} lg={10} xl={8} xxl={6}>
            <Outlet />
          </Col>
        </Row>
      </Layout.Content>

      <Layout.Footer className={classes.footer}>
        Copyright &copy; {currentYear} Ministerio de Administración Publica
      </Layout.Footer>
    </Layout>
  );
}

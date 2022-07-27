import React from "react";
import { useNavigate, useLocation, Location } from "react-router-dom";
import { Layout, PageHeader } from "antd";
import { AppBox } from "library/components/AppBox";
import { Breadcrumb } from "library/components/Breadcrumb";

import classes from "./Main.module.css";

interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout.Content className={classes.main}>
      <AppBox>
        {/* <Breadcrumb /> */}
        {/* <Breadcrumb className={classes.breadcrumb}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb> */}

        {/* <PageHeader
          onBack={() => navigate("/")}
          title={'headings.complete_evaluation'}
        /> */}
      </AppBox>

      {children}
    </Layout.Content>
  );
}

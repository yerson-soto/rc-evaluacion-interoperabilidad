import React from "react";
import { useNavigate, useLocation, Location } from "react-router-dom";
import { Layout, PageHeader } from "antd";
import { Box } from "library/components/Box";
import { Breadcrumb } from "library/components/Breadcrumb";

import classes from "./Main.module.css";

interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  const navigate = useNavigate();
  const location = useLocation();

  console.log();

  return (
    <Layout.Content className={classes.main}>
      <Box>
        <Breadcrumb />
        {/* <Breadcrumb className={classes.breadcrumb}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb> */}

        {/* <PageHeader
          onBack={() => navigate("/")}
          title={'headings.complete_evaluation'}
        /> */}
      </Box>

      {children}
    </Layout.Content>
  );
}

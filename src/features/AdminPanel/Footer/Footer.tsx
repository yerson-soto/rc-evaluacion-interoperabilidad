import React from "react";
import { Layout, Typography } from "antd";

import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <Layout.Footer className={classes.footer}>
      <Typography.Text className={classes.text}>
        Modelo de Madurez &copy; 2018 Ministerio de Administraci&oacute;n P&uacute;blica
      </Typography.Text>
    </Layout.Footer>
  );
}

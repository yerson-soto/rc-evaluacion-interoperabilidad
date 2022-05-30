import React from "react";
import { Box } from "library/components/Box";
import { Typography, Input } from "antd";

import classes from "./AnswerRadio.module.css";

export default function AnswerRadio() {
  return (
    <Box className={classes.answer} style={{ marginBottom: 10 }}>
      <Box className={classes.box}>
        <input type="radio" className={classes.radio} />
        <label className={classes.label}>A</label>
      </Box>
      <Typography.Text style={{  fontSize: '16px', marginLeft: 10}}>
        No existe un responsable de los servicios de intercambio de información
      </Typography.Text>
    </Box>
  );
}

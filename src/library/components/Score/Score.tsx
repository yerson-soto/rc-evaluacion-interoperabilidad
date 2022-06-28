import React from "react";
import { Box } from "library/components/Box";

import classes from "./Score.module.css";
import chroma from "chroma-js";

interface ScoreProps {
  value: number | null;
}

export default function Score({ value }: ScoreProps) {
  const colors = chroma.scale(["#ef8269", "#fba31e", "#2ac158"]).colors(6);
  const color = value ? colors[Number(value.toFixed())] : 'gray';

  return (
    <Box className={classes.shape} style={{ backgroundColor: color }}>
      <Box className={classes.score}>{value || '-'}</Box>
    </Box>
  );
}

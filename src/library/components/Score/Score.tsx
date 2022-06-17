import React from "react";
import { Box } from "library/components/Box";

import classes from "./Score.module.css";
import chroma from "chroma-js";

interface ScoreProps {
  value: number;
}

export default function Score({ value }: ScoreProps) {
  const colors = chroma.scale(["#f16317", "#e9c320", "#0ba931"]).colors(6);
  const color = colors[Number(value.toFixed())];

  return (
    <Box className={classes.shape} style={{ backgroundColor: color }}>
      <Box className={classes.score}>{value}</Box>
    </Box>
  );
}

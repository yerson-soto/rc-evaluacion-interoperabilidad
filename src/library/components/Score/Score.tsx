import React from "react";
import { Box } from "library/components/Box";

import classes from "./Score.module.css";

interface ScoreProps {
  value: number;
}

export default function Score({ value }: ScoreProps) {
  return (
    <Box className={classes.shape}>
      <Box className={classes.score}>{value}</Box>
    </Box>
  );
}

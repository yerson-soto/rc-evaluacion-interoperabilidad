import React from "react";
import { AppBox } from "library/components/AppBox";

import classes from "./Score.module.css";
import chroma from "chroma-js";

interface ScoreProps {
  value: number | null;
}

export default function Score({ value }: ScoreProps) {
  const colors = chroma.scale(["#cfc039", "#fba31e", "#2ac158"]).colors(6);
  const color = value ? colors[Number(value.toFixed())] : 'gray';

  return (
    <AppBox className={classes.shape} style={{ backgroundColor: color }}>
      <AppBox className={classes.score}>{value || '-'}</AppBox>
    </AppBox>
  );
}

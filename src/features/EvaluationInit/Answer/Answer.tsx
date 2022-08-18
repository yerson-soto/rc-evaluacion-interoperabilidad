import React from "react";
import { LightChoice } from "library/models/Choice";
import { AppBox } from "library/components/AppBox";
import { AnswerRadio } from "features/EvaluationInit/AnswerRadio";
import { Badge } from "antd";

import classes from "./Answer.module.css";

interface AnswerProps {
  choice: LightChoice;
  color: string;
  isSelected?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Answer(props: AnswerProps) {
  const { choice, color, isSelected, onChange } = props;

  return (
    <AppBox className={classes.choice}>
      {/* <Badge.Ribbon
        placement="start"
        color={color}
        text={choice.level.value}
      > */}
        <AnswerRadio
          value={choice.level.value}
          name="choice"
          color="#fce5d7"
          onChange={onChange}
          defaultChecked={isSelected}
          label={choice.details}
        />
      {/* </Badge.Ribbon> */}
    </AppBox>
  );
}

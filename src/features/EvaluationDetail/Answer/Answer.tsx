import React from "react";
import { Badge } from "antd";
import { Choice } from "library/models/Choice";
import { AppBox } from "library/components/AppBox";
import { AnswerRadio } from "../AnswerRadio";

import classes from "./Answer.module.css";

interface AnswerProps {
  choice: Choice;
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

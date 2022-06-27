import React from "react";
import { Choice } from "library/models/Choice";
import { Box } from "library/components/Box";
import { AnswerRadio } from "features/EvaluationInit/AnswerRadio";
import { Badge } from "antd";

import classes from "./Response.module.css";

interface ResponseProps {
  choice: Choice;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ResponseProps(props: ResponseProps) {
  const { choice, onChange } = props;

  return (
    <Box className={classes.choice}>
      <Badge.Ribbon
        placement="start"
        color={choice.hexColor}
        text={choice.level.value}
      >
        <AnswerRadio
          value={choice.level.value}
          name="choice"
          color="#fce5d7"
          onChange={onChange}
          label={choice.details}
        />
      </Badge.Ribbon>
    </Box>
  );
}

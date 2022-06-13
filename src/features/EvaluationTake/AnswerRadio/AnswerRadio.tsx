import React, { forwardRef } from "react";
import { CheckCircleFilled } from "@ant-design/icons";

import classes from "./AnswerRadio.module.css";

interface AnswerRadioProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  color: string;
}

export default forwardRef<any, AnswerRadioProps>((props, ref) => {
  const { label, color, ...inputProps } = props;

  return (
    <label
      className={classes.label}
      style={{ borderLeftColor: color }}
    >
      {label}

      <input
        type="radio"
        name={inputProps.name}
        className={classes.radio}
        ref={ref}
        {...inputProps}
      />

      <span className={classes.markBox}>
        <CheckCircleFilled className={classes.mark} />
      </span>
    </label>
  );
});
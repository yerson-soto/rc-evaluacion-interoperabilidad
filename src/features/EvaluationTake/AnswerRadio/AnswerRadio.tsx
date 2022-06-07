import React, { useState, forwardRef } from "react";
import { Box } from "library/components/Box";
import { Typography, Input, Card } from "antd";
import { CheckOutlined, CheckCircleFilled } from "@ant-design/icons";

import classes from "./AnswerRadio.module.css";

interface AnswerRadioProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  color: string;
}

export default forwardRef<any, AnswerRadioProps>((props, ref) => {
  const { label, color, ...inputProps } = props;

  return (
    <label
      className={classes.answer}
      style={{ borderLeftColor: color }}
      // onClick={handleClick}
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

// export default function AnswerRadio(props: AnswerRadioProps) {
//   const ref = useRef() as React.RefObject<HTMLInputElement>;
//   const { label, color, ...inputProps } = props;

//   return (
//     <label
//       className={classes.answer}
//       style={{ borderLeftColor: color }}
//       // onClick={handleClick}
//     >
//       {label}

//       <input
//         type="radio"
//         name={inputProps.name}
//         className={classes.radio}
//         ref={ref}
//         {...inputProps}
//       />

//       <Box className={classes.markBox}>
//         <CheckCircleFilled className={classes.mark} />
//       </Box>
//     </label>
//   );
// }

// export default function AnswerRadio({ label }: AnswerRadioProps) {
//   return (
//     <Box className={classes.answer}>
//       <Box className={classes.box}>
//         <input type="radio" className={classes.radio} />
//         <label className={classes.label}>A</label>
//       </Box>
//       <Typography.Text style={{  fontSize: '16px', marginLeft: 10}}>
//         {label}
//       </Typography.Text>
//     </Box>
//   );
// }

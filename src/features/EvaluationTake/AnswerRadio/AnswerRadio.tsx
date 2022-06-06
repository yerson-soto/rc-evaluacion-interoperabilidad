import React from "react";
import { Box } from "library/components/Box";
import { Typography, Input, Card } from "antd";

import classes from "./AnswerRadio.module.css";

interface AnswerRadioProps {
  label: string;
  color: string;
}

export default function AnswerRadio(props: AnswerRadioProps) {
  const { label, color, ...rest } = props;
  
  return (
    <Card className={classes.answer} style={{ background: color }} bordered={false}>
      {/* <Box>
        <input type="radio" className={classes.radio} />
        <label className={classes.label}>A</label>
      </Box> */}
      <Typography.Text>
        {label}
      </Typography.Text>

    </Card>
  );
}

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

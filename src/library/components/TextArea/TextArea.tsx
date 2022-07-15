import React, { forwardRef } from "react";
import { Input } from "antd";
import { TextAreaProps } from "antd/lib/input";

import classes from "./TextArea.module.css";

export default forwardRef<any, TextAreaProps>((props, ref) => (
  <Input.TextArea ref={ref} className={classes.field} {...props} />
));

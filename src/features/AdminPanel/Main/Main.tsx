import React from "react";

import classes from "./Main.module.css";

interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  return <main className={classes.main}>{children}</main>;
}

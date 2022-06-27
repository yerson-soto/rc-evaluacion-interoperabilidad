import React from "react";
import { Divider } from "antd";

interface SectionDivider {
  text: string;
}

export default function SectionDivider({ text }: SectionDivider) {
  return (
    <Divider style={{ fontSize: "14px" }} orientation="left">
      {text}
    </Divider>
  );
}

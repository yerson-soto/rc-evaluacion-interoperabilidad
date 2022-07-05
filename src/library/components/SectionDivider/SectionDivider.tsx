import React from "react";
import { Divider } from "antd";

interface SectionDividerProps {
  text: string;
}

export default function SectionDivider({ text }: SectionDividerProps) {
  return (
    <Divider style={{ fontSize: "14px" }} orientation="left">
      {text}
    </Divider>
  );
}

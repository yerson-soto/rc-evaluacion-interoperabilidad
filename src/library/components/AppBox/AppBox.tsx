import React from "react";

type AppBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  component?: React.FC<any> | string;
};

export default function AppBox(props: AppBoxProps) {
  const { component, ...rest } = props;
  return React.createElement(component ? component : "div", rest);
}

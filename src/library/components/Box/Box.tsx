import React from "react";

type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  component?: React.FC<any> | string;
};

export default function Box(props: BoxProps) {
  const { component, ...rest } = props;
  return React.createElement(component ? component : "div", rest);
}

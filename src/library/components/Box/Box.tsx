import React from "react";

type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export default function Box(props: BoxProps) {
  return <div {...props} />;
}

import React from "react";
import { Grid, Card, CardProps, Space, Divider } from "antd";
import { CardMetaProps } from "antd/lib/card";

const { useBreakpoint } = Grid;

interface ActionCardProps extends CardProps {}

export default function ActionCard(props: ActionCardProps) {
  const breakpoints = useBreakpoint();

  const { children, actions } = props;

  console.log(breakpoints);

  return (
    <Card actions={actions}>
      {children}

      <Space 
        direction="vertical" 
        split={<Divider type="horizontal" />}
      >
        {/* {actions?.map((action) => action)} */}
      </Space>
    </Card>
  );
}

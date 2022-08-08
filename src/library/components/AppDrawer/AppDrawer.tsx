import React from "react";
import { Grid, Drawer, DrawerProps } from "antd";

interface AppDrawerProps extends DrawerProps {
  children: React.ReactNode;
  onCloseEnd?: () => void;
}

export default function AppDrawer(props: AppDrawerProps) {
  const { md: isDesktop } = Grid.useBreakpoint();
  const { children, onCloseEnd, ...drawerProps } = props;

  const handleVisibilityChange = (visible: boolean): void => {
    if (!visible && onCloseEnd) onCloseEnd();
  };

  return (
    <Drawer
      width={isDesktop ? 500 : "100%"}
      afterVisibleChange={handleVisibilityChange}
      forceRender
      destroyOnClose
      {...drawerProps}
    >
      {children}
    </Drawer>
  );
}

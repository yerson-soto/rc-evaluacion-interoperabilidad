import React from "react";
import { Grid, Drawer, DrawerProps } from "antd";

interface AppDrawerProps extends DrawerProps {
  children: React.ReactNode;
  onCloseEnd?: () => void;
}

export default function AppDrawer(props: AppDrawerProps) {
  const { md: isDesktop } = Grid.useBreakpoint();
  const { children, onCloseEnd, width, ...drawerProps } = props;

  const drawerWidth = width ? width : 500;
  
  const handleVisibilityChange = (visible: boolean): void => {
    if (!visible && onCloseEnd) onCloseEnd();
  };

  return (
    <Drawer
      width={isDesktop ? drawerWidth : "100%"}
      afterVisibleChange={handleVisibilityChange}
      forceRender
      destroyOnClose
      {...drawerProps}
    >
      {children}
    </Drawer>
  );
}

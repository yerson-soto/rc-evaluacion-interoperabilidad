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
  
  const handleOpenChange = (open: boolean): void => {
    if (!open && onCloseEnd) onCloseEnd();
  };

  return (
    <Drawer
      width={isDesktop ? drawerWidth : "100%"}
      afterOpenChange={handleOpenChange}
      forceRender
      destroyOnClose
      {...drawerProps}
    >
      {children}
    </Drawer>
  );
}

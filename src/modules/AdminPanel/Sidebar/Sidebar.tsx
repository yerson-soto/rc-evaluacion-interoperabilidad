import React from "react";

import {
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import "react-pro-sidebar/dist/css/styles.css";

export default function Sidebar() {
  return (
    <ProSidebar>
      <SidebarHeader>Header</SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem>Dashboard</MenuItem>
          <SubMenu title="Components">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
      <SidebarFooter>footer</SidebarFooter>
    </ProSidebar>
  );
}

import React from "react";
import { Avatar, Image, Layout, Space } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";

import classes from "./Header.module.css";

interface HeaderProps {
  onToggleSidenav: () => void;
}

export default function Header({ onToggleSidenav }: HeaderProps) {
  return (
    <Layout.Header className={classes.header}>
      <MenuOutlined className={classes.trigger} onClick={onToggleSidenav} />

      <Space>
        <Avatar size="large" icon={<UserOutlined />} />
      </Space>
    </Layout.Header>
  );
}

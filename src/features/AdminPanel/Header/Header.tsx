import React from "react";
import { Avatar, Dropdown, Layout, Menu, Space } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";

import classes from "./Header.module.css";
import i18n from 'i18next';

interface HeaderProps {
  onToggleSidenav: () => void;
}

export default function Header({ onToggleSidenav }: HeaderProps) {
  const langs = [
    {
      key: "es",
      label: "Español",
      onClick: () => changeLanguage('es'),
      disabled: i18n.resolvedLanguage === 'es'
    },
    {
      key: "en",
      label: "English",
      onClick: () => changeLanguage('en'),
      disabled: i18n.resolvedLanguage === 'en'
    },
  ];

  const changeLanguage = async (key: string) => {
    await i18n.changeLanguage(key);
    window.history.go(0);
  }

  return (
    <Layout.Header className={classes.header}>
      <MenuOutlined className={classes.trigger} onClick={onToggleSidenav} />

      <Space size="large">
        <Dropdown.Button size="large" overlay={<Menu items={langs} />}>
          {i18n.resolvedLanguage}
        </Dropdown.Button>
        <Avatar size="large" icon={<UserOutlined />} />
      </Space>
    </Layout.Header>
  );
}

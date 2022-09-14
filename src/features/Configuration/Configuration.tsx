import React from "react";
import { Card, Tabs, Grid } from 'antd';
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { paths } from "library/common/constants";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { PasswordConfig } from "./PasswordConfig";
import { AppBox } from "library/components/AppBox";
import { GeneralConfig } from "./GeneralConfig";


const { useBreakpoint } = Grid;

const getItem = (
  label: React.ReactNode,
  key: string,
  icon: React.ReactNode,
  children: React.ReactNode,
) => {
  return {
    label: (
      <span>
        {icon}
        {label}
      </span>
    ),
    key,
    children,
  };
};


export default function Configuration() {
  const { tab } = useParams();
  const { t } = useTranslation();
  const { lg: isDesktop } = useBreakpoint();
  const navigate = useNavigate();
  
  const handleTabChange = (tab: string): void => {
    const tabPath = paths.admin.settings.target.reverse({ tab });
    navigate(tabPath);
  };

  const items = [
    getItem(
      t("settings.general"),
      "general",
      <UserOutlined />,
      <AppBox style={{ maxWidth: '600px' }}>
        <GeneralConfig />
      </AppBox>
    ),
    getItem(
      t("settings.password"),
      "contrasena",
      <LockOutlined />,
      <AppBox style={{ maxWidth: '600px' }}>
        <PasswordConfig />
      </AppBox>
    )
  ]
  
  return (
    <Card>
      <Tabs
        items={items}
        tabPosition={isDesktop ? "left" : "top"}
        onChange={handleTabChange}
        defaultActiveKey={tab}
        destroyInactiveTabPane
        tabBarStyle={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "#ffffff",
        }}
      />
    </Card>
  );
}

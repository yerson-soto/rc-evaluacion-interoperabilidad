import React from "react";
import { Card, Tabs, Grid } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, Outlet, useLocation, Navigate } from "react-router-dom";
import { paths } from "library/common/constants";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AppBox } from "library/components/AppBox";

const { useBreakpoint } = Grid;

const getItem = (
  label: React.ReactNode,
  key: string,
  icon: React.ReactNode,
  children: React.ReactNode
) => {
  return {
    label: (
      <span>
        {icon}
        {label}
      </span>
    ),
    key,
    children: <AppBox style={{ maxWidth: "600px" }}>{children}</AppBox>,
  };
};

export default function Configuration() {
  const { t } = useTranslation();
  const { lg: isDesktop } = useBreakpoint();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === paths.admin.settings.index) {
    return <Navigate to={paths.admin.settings.general.index} />
  }

  const handleTabChange = (tab: string): void => {
    navigate(tab);
  };

  const items = [
    getItem(
      t("settings.general"),
      paths.admin.settings.general.fullPath,
      <UserOutlined />,
      <Outlet />
    ),
    getItem(
      t("settings.password"),
      paths.admin.settings.password.fullPath,
      <LockOutlined />,
      <Outlet />
    ),
  ];

  return (
    <Card>
      <Tabs
        items={items}
        tabPosition={isDesktop ? "left" : "top"}
        onChange={handleTabChange as any}
        activeKey={location.pathname}
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

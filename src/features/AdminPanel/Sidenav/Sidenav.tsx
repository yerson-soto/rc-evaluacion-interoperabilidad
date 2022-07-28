import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Popconfirm, Typography } from "antd";
import { AppBox } from "library/components/AppBox";

import {
  SignalFilled,
  PieChartFilled,
  AppstoreFilled,
  LoginOutlined,
  AlignLeftOutlined,
  AppstoreOutlined,
  CompressOutlined,
  LeftOutlined,
  FormOutlined,
  AimOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { MenuItem } from "library/common/types";
import { keys, paths } from "library/common/constants";

import classnames from "classnames";
import classes from "./Sidenav.module.css";
import { useAppDispatch } from "redux/hooks";
import { logoutDone } from "redux/slices/authSlice";
import { useTranslation } from "react-i18next";

interface SidenavProps {
  isCompacted: boolean;
  baseWidth: string | number;
  compactedWidth: string | number;

  onToggle: () => void;
  onLayoutChange: (isSmallDevice: boolean) => void;
  onCollapse: () => void;
}

export default function Sidenav(props: SidenavProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const {
    isCompacted,
    baseWidth,
    compactedWidth,
    onToggle,
    onCollapse,
    onLayoutChange,
  } = props;

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    href: string,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      onClick: () => navigate(href),
      label,
    } as MenuItem;
  };

  const getItems = (): MenuItem[] => {
    return [
      getItem(t("nav.dashboard"), "1", "/", <PieChartFilled />),
      getItem(t("nav.users"), "2", paths.management.users.reverse(), <UsergroupAddOutlined />),
      getItem(t("nav.evaluations"), "3", "/evaluaciones", <AppstoreFilled />),
      getItem(t("nav.domains"), "4", paths.management.domains.reverse(), <AimOutlined />),
      getItem(
        t("nav.lineaments"),
        "5",
        paths.management.lineaments.reverse(),
        <AlignLeftOutlined />
      ),
      getItem(t("nav.criterions"), "6", paths.management.criterions.reverse(), <CompressOutlined />),
      getItem(t("nav.levels"), "7", paths.management.levels.reverse(), <SignalFilled />),
      getItem(t("nav.answers"), "8", paths.management.choices.reverse(), <FormOutlined />),
      getItem(t("nav.evaluations_crud"), "9", paths.management.evaluations.reverse(), <FormOutlined />),
      getItem(t("nav.my_account"), "10", paths.admin.settings.index, <SettingOutlined />),
      getItem(
        t("nav.login"),
        "11",
        paths.auth.login.reverse(),
        <LoginOutlined />
      ),
      {
        key: "12",
        icon: <LogoutOutlined />,
        label: (
          <Popconfirm
            placement="bottomLeft"
            title="Deseas cerrar sesion?"
            onConfirm={() => {
              localStorage.removeItem(keys.tokenLocalStorage);
              dispatch(logoutDone());
            }}
            okText="Si"
            cancelText="No"
          >
            <a href="#">{t("nav.logout")}</a>
          </Popconfirm>
        ),
      },
    ];
  };

  const onBreakpoint = (broken: boolean): void => onLayoutChange(broken);

  const getClassNames = (): string =>
    classnames(classes.sidenav, {
      [classes.closed]: isCompacted,
    });

  return (
    <Layout.Sider
      collapsible
      theme="dark"
      breakpoint="lg"
      trigger={null}
      width={baseWidth}
      collapsedWidth={compactedWidth}
      collapsed={isCompacted}
      onBreakpoint={onBreakpoint}
      className={getClassNames()}
    >
      <AppBox className={classes.logo}>
        <AppstoreOutlined className={classes.logoIcon} />
        <Typography.Text className={classes.logoText}>
          Evaluaci&oacute;n
        </Typography.Text>
      </AppBox>
      <Menu
        className={classes.menu}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={getItems()}
      />

      <AppBox onClick={onToggle} className={classes.trigger}>
        <LeftOutlined />
      </AppBox>
    </Layout.Sider>
  );
}

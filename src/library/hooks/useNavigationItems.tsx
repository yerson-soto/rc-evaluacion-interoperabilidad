import { useAppSelector } from "redux/hooks";
import { useTranslation } from 'react-i18next';
import { UserType } from "library/common/enums";
import { paths } from "library/common/constants";
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '../common/types';

import {
  SignalFilled,
  PieChartFilled,
  AppstoreFilled,
  AlignLeftOutlined,
  CompressOutlined,
  FormOutlined,
  AimOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";

type NavItem = MenuItem & {
  path: string;
  permissions?: UserType[];
  children?: NavItem[];
}

const { admin, management } = paths;

export function useNavigationItems() {
  const userType = useAppSelector((state) => state.auth.user.type);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navItems: NavItem[] = [
    { 
      key: admin.index,
      label: t("nav.dashboard"), 
      path: admin.index, 
      icon: <PieChartFilled />,
      onClick: () => navigate(admin.index)
    },
    {
      key: management.users.fullPath,
      label: t("nav.users"),
      path: management.users.fullPath,
      icon: <UsergroupAddOutlined />,
      permissions: [UserType.Admin],
      onClick: () => navigate(management.users.fullPath)
    },
    { 
      key: admin.evaluations.index,
      label: t("nav.evaluations"), 
      path: admin.evaluations.index, 
      icon: <AppstoreFilled />,
      permissions: [UserType.Admin, UserType.Support],
      onClick: () => navigate(admin.evaluations.index)
    },
    {
      key: management.domains.fullPath,
      label: t("nav.domains"),
      path: management.domains.fullPath,
      icon: <AimOutlined />,
      permissions: [UserType.Admin],
      onClick: () => navigate(management.domains.fullPath)
    },
    {
      key: management.lineaments.fullPath,
      label: t("nav.lineaments"),
      path: management.lineaments.fullPath,
      icon: <AlignLeftOutlined />,
      permissions: [UserType.Admin],
      onClick: () => navigate(management.lineaments.fullPath)
    },
    {
      key: management.criterions.fullPath,
      label: t("nav.criterions"),
      path: management.criterions.fullPath,
      icon: <CompressOutlined />,
      permissions: [UserType.Admin],
      onClick: () => navigate(management.criterions.fullPath)
    },
    {
      key: management.levels.fullPath,
      label: t("nav.levels"),
      path: management.levels.fullPath,
      icon: <SignalFilled />,
      permissions: [UserType.Admin],
      onClick: () => navigate(management.levels.fullPath)
    },
    {
      key: management.choices.fullPath,
      label: t("nav.answers"),
      path: management.choices.fullPath,
      icon: <FormOutlined />,
      permissions: [UserType.Admin],
      onClick: () => navigate(management.choices.fullPath)
    },
    {
      key: admin.maturityModel.index,
      label: t("nav.maturity_model"),
      path: admin.maturityModel.index,
      icon: <FormOutlined />,
      onClick: () => navigate(admin.maturityModel.index)
    },
    {
      key: admin.settings.index,
      label: t("nav.my_account"),
      path: admin.settings.index,
      icon: <SettingOutlined />,
      onClick: () => navigate(admin.settings.index),
    },
  ];

  return navItems.filter(navItem => {
    return !navItem.permissions || navItem.permissions.includes(userType);
  })
}

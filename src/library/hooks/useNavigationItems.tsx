import { useAppSelector } from "redux/hooks";
import { useTranslation } from "react-i18next";
import { UserType } from "library/common/enums";
import { paths } from "library/common/constants";
import { MenuItem } from "../common/types";
import { useMemo } from "react";

import {
  SignalFilled,
  PieChartFilled,
  SnippetsOutlined,
  AlignLeftOutlined,
  CompressOutlined,
  FormOutlined,
  AimOutlined,
  UsergroupAddOutlined,
  InsertRowBelowOutlined,
  HistoryOutlined,
  ScheduleOutlined,
  SettingOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

export type NavItem = MenuItem & {
  path: string;
  label: string;
  iconelement: React.ElementType;
  permissions?: UserType[];
  children?: NavItem[];
};

export interface FlattenNavItem {
  parents: string[];
  path: string;
}

export const flatNavItems = (
  navItems: NavItem[],
  parents?: string[]
): FlattenNavItem[] => {
  return navItems.reduce<FlattenNavItem[]>((prev, navItem) => {
    prev.push({
      path: navItem.path,
      parents: parents ? parents : [],
    });

    if (navItem.children) {
      const childrenParents = parents
        ? [...parents, navItem.path]
        : [navItem.path];

      prev.push(...flatNavItems(navItem.children, childrenParents));
    }

    return prev;
  }, []);
};

export const reduceNavItems = (
  navItems: NavItem[],
  permission: UserType
): NavItem[] => {
  return navItems.reduce<NavItem[]>((prev, navItem) => {
    const shouldAdd =
      !navItem.permissions || navItem.permissions.includes(permission);

    if (shouldAdd) {
      if (navItem.children) {
        navItem.children = reduceNavItems(navItem.children, permission);
      }

      prev.push(navItem);
    }

    return prev;
  }, []);
};

const { admin, management } = paths;

export function useNavigationItems() {
  const userType = useAppSelector((state) => state.auth.user.type);
  const { t } = useTranslation();

  const navItems: NavItem[] = [
    {
      key: admin.index,
      label: t("nav.dashboard"),
      path: admin.index,
      icon: <PieChartFilled />,
      iconelement: PieChartFilled,
    },
    {
      key: admin.evaluations.index,
      label: t("nav.evaluations"),
      path: admin.evaluations.index,
      icon: <SnippetsOutlined />,
      iconelement: SnippetsOutlined,
      permissions: [UserType.Admin, UserType.Support],
    },
    {
      key: admin.ranking.index,
      label: t("nav.ranking"),
      path: admin.ranking.index,
      icon: <HistoryOutlined />,
      iconelement: HistoryOutlined,
      permissions: [UserType.Admin, UserType.Support],
    },
    {
      key: admin.schedule.index,
      label: t("nav.schedule"),
      path: admin.schedule.index,
      icon: <ScheduleOutlined />,
      iconelement: ScheduleOutlined,
    },
    {
      key: "maturity-model",
      label: t("nav.maturity_model"),
      path: admin.maturityModel.index,
      icon: <InsertRowBelowOutlined />,
      iconelement: InsertRowBelowOutlined,
      children: [
        {
          key: admin.maturityModel.index,
          label: t("nav.maturity_model_sub"),
          path: admin.maturityModel.index,
          icon: <InsertRowBelowOutlined />,
          iconelement: InsertRowBelowOutlined,
        },
        {
          key: management.domains.fullPath,
          label: t("nav.domains"),
          path: management.domains.fullPath,
          icon: <AimOutlined />,
          iconelement: AimOutlined,
          permissions: [UserType.Admin],
        },
        {
          key: management.lineaments.fullPath,
          label: t("nav.lineaments"),
          path: management.lineaments.fullPath,
          icon: <AlignLeftOutlined />,
          iconelement: AlignLeftOutlined,
          permissions: [UserType.Admin],
        },
        {
          key: management.criterions.fullPath,
          label: t("nav.criterions"),
          path: management.criterions.fullPath,
          icon: <CompressOutlined />,
          iconelement: CompressOutlined,
          permissions: [UserType.Admin],
        },
        {
          key: management.levels.fullPath,
          label: t("nav.levels"),
          path: management.levels.fullPath,
          icon: <SignalFilled />,
          iconelement: SignalFilled,
          permissions: [UserType.Admin],
        },
        {
          key: management.choices.fullPath,
          label: t("nav.answers"),
          path: management.choices.fullPath,
          icon: <FormOutlined />,
          iconelement: FormOutlined,
          permissions: [UserType.Admin],
        },
      ],
    },
    {
      key: admin.settings.index,
      label: t("nav.settings"),
      path: admin.settings.index,
      icon: <SettingOutlined />,
      iconelement: SettingOutlined,
      children: [
        // {
        //   key: admin.settings.general.fullPath,
        //   label: t("settings.general"),
        //   path: admin.settings.general.fullPath,
        //   icon: <UserOutlined />,
        //   iconelement: UserOutlined,
        // },
        {
          key: admin.settings.password.fullPath,
          label: t("settings.password"),
          path: admin.settings.password.fullPath,
          icon: <LockOutlined />,
          iconelement: LockOutlined,
        },
      ],
    },
    {
      key: management.users.fullPath,
      label: t("nav.users"),
      path: management.users.fullPath,
      icon: <UsergroupAddOutlined />,
      iconelement: UsergroupAddOutlined,
      permissions: [UserType.Admin],
    },
  ];

  return useMemo(() => reduceNavItems(navItems, userType), [userType]);
}

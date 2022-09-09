import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Card, Divider, Menu, Switch, Tabs } from 'antd';
import type { MenuProps, MenuTheme } from 'antd/es/menu';
import React, { useState } from 'react';
import { paths } from '../../library/common/constants';
import { useParams, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Contraseña', 'contrasena', <MailOutlined />),
  getItem('Cuenta', 'perfil', <CalendarOutlined />),
  getItem('Perfil', 'sub1', <AppstoreOutlined />),
  getItem('Notificaciones', 'sub2', <SettingOutlined />),
];

export default function Settings() {
  const { tab } = useParams();
  const navigate = useNavigate();

  return (
    <Card>
       <Tabs tabPosition="left" defaultActiveKey={tab} onChange={(tab) => navigate(paths.admin.settings.target.reverse({ tab }))}>
          {items.map(item => (
            <Tabs.TabPane tab={item.label} key={item.key}>{item.label}</Tabs.TabPane>
          ))}
       </Tabs>
    </Card>
  );
};
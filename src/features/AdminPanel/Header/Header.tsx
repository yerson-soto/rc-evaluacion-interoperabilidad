import React from 'react';
import { Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import classes from './Header.module.css';

interface HeaderProps {
  onToggleSidenav: () => void;
}

export default function Header({ onToggleSidenav }: HeaderProps) {
  return (
    <Layout.Header 
    // className={classes.header}
    >
      {React.createElement(MenuOutlined, {
        className: classes.trigger,
        onClick: onToggleSidenav,
      })}
    </Layout.Header>
  );
}

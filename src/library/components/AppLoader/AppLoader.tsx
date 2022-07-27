import React from 'react'
import { Spin, Typography } from 'antd';
import { AppBox } from '../AppBox';

import classes from './AppLoader.module.css';

interface AppLoaderProps {
  text?: string;
}

export default function AppLoader({ text }: AppLoaderProps) {
  return (
    <AppBox className={classes.center}>
      <Spin size="large" />
      {text && <Typography.Text>{text}</Typography.Text>}
    </AppBox>
  )
}

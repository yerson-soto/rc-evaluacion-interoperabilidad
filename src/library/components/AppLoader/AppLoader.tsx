import React from 'react'
import { Spin, Typography } from 'antd';
import { Box } from '../Box';

import classes from './AppLoader.module.css';

interface AppLoaderProps {
  text?: string;
}

export default function AppLoader({ text }: AppLoaderProps) {
  return (
    <Box className={classes.center}>
      <Spin size="large" />
      {text && <Typography.Text>{text}</Typography.Text>}
    </Box>
  )
}

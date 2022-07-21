import React from 'react'
import { Spin } from 'antd'

import classes from './AppLoader.module.css';
import { Box } from '../Box';

export default function AppLoader() {
  return (
    <Box className={classes.center}>
      <Spin size="default" />
    </Box>
  )
}

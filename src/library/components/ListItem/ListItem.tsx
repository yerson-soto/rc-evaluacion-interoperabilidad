import React from 'react'
import { List } from 'antd'
import { ListItemProps } from 'antd/lib/list'
import { Box } from 'library/components/Box'

import classes from './ListItem.module.css';

export default function ListItem(props: ListItemProps) {
  const { children, ...rest } = props;
  
  return <List.Item {...rest}>
    <Box className={classes.content}>{children}</Box>
  </List.Item>
}

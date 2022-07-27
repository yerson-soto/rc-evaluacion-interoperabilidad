import React from 'react'
import { List } from 'antd'
import { ListItemProps } from 'antd/lib/list'
import { AppBox } from 'library/components/AppBox'

import classes from './ListItem.module.css';

export default function ListItem(props: ListItemProps) {
  const { children, ...rest } = props;
  
  return <List.Item {...rest}>
    <AppBox className={classes.content}>{children}</AppBox>
  </List.Item>
}

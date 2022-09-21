import React from "react";
import { Tag, Timeline, Typography } from 'antd';
import { useInstitutionTimeline } from "./useInstitutionTimeline";

import classes from './InstitutionTimeline.module.css';

interface InstitutionTimelineProps {
  id: number;
}

export default function InstitutionTimeline({ id }: InstitutionTimelineProps) {
  const { timeline } = useInstitutionTimeline(id);

  return (
    <Timeline 
      className={classes.timeline} 
      mode="alternate" 
      reverse
    > 
      {timeline.map((item) => (
        <Timeline.Item
          key={item.key}
          position={item.position}
          color={item.color}
          label={<Tag color={item.statusColor}>{item.status}</Tag>}
          className={classes.item}
        >
          {item.title && (
            <Typography.Text className={classes.itemTitle}>
              {item.title}
            </Typography.Text>
          )}
          
          {item.content}
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

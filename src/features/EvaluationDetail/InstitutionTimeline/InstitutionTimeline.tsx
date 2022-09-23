import React from "react";
import { Spin, Tag, Timeline, Typography } from 'antd';
import { useInstitutionTimeline } from "./useInstitutionTimeline";

import classes from './InstitutionTimeline.module.css';
import AppBox from 'library/components/AppBox/AppBox';
import { AppLoader } from "library/components/AppLoader";

interface InstitutionTimelineProps {
  id: number;
 }

export default function InstitutionTimeline({ id }: InstitutionTimelineProps) {
  const { timeline, isLoading } = useInstitutionTimeline(id);

  // Show Feedback when no timeline
  if (isLoading) return <AppLoader text="Cargando" />;

  return (timeline.length === 0) ? <p style={{ textAlign: 'center'}}>Esta institucion no ha completado ninguna evaluacion</p>  :
  
  (
    <AppBox>
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
    </AppBox>
  );
}

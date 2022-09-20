import React from "react";
import { Avatar, Timeline, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Organization } from "library/models/Organization";
import { useInstitutionTimeline } from "./useInstitutionTimeline";
import { Evaluation } from 'library/models/Evaluation';
import { contentTypeLabels } from '../../../library/common/constants';

interface InstitutionTimelineProps {
  institution: Organization;
}

export default function InstitutionTimeline(props: InstitutionTimelineProps) {
  console.log('hola')
  const { institution } = props;
  const { evaluations } = useInstitutionTimeline(institution.id);

  const renderTimelineItem = (evaluation: Evaluation): React.ReactNode => {
    const { uid, nomenclature, score, indicatorColor, dateCreated } = evaluation;
    
    return (
      <Timeline.Item 
        key={uid} 
        color={indicatorColor} 
        dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
      >
        <Typography.Title level={5}>{nomenclature}</Typography.Title>
        <p>{dateCreated}</p>
      </Timeline.Item>
    )
  }

  return (
    <Timeline>
      {evaluations.map(renderTimelineItem)}
    </Timeline>
  );
}

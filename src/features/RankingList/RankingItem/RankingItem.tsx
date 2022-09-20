import React from "react";
import { Avatar, Button, List, Progress, Space, Typography, Timeline, Modal } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Ranking } from "library/models/Ranking";
import { ListItem } from "library/components/ListItem";
import { getScoreColor } from "library/helpers/score-color";

 
import { Evaluation } from 'library/models/Evaluation';
import InstitutionTimeline from '../../EvaluationDetail/InstitutionTimeline/InstitutionTimeline';

interface RankingItemProps {
  ranking: Ranking;
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function RankingItem({ ranking }: RankingItemProps) {
  const { institution, score } = ranking;
  const { name, acronym } = institution;

  const title = institution.acronym ? `${name} (${acronym})` : name;

  return (
    <List.Item
      key={institution.name}
      actions={[
        // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        // <IconText
        //   icon={MessageOutlined}
        //   text="2"
        //   key="list-vertical-message"
        // />,
        <Button onClick={() => {
          Modal.info({
            title: "Linea de tiempo",
            content: <InstitutionTimeline institution={institution} />
          })
        }}>Ver Todo</Button>,
      ]}
    >
      <List.Item.Meta
        title={title}
        description="Ha sido evaluado 5 veces"
        avatar={
          <Progress
            width={60}
            type="dashboard"
            percent={(score * 100) / 5}
            format={() => score}
            strokeColor={getScoreColor(score)}
          />
        }
      />
    </List.Item>
  );
}



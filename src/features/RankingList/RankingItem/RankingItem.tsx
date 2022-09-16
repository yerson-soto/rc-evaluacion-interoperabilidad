import React from 'react'
import { Avatar, List, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Rating } from 'library/models/Rating';

interface RankingItemProps {
  rating: Rating;
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function RankingItem({ rating }: RankingItemProps) {
  const { institution, score } = rating;
  
  return (
    <List.Item
      key={institution.name}
      actions={[
        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar>{institution.acronym}</Avatar>}
        title={institution.name}
        description={institution.emailDomain}
      />
      {institution.name}
    </List.Item>
  )
}

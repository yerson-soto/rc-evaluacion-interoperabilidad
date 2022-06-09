import React from 'react'

import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import { Question } from '../Question';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: 'https://joeschmoe.io/api/v1/random',
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));


export default function Questionary() {
  return (
    <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 1,
    }}
    dataSource={data}
    renderItem={item => (
      <Question key={item.href} />
      // <List.Item
      //   key={item.title}
      //   actions={[
      //     <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
      //     <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
      //     <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
      //   ]}
      // >
      //   <List.Item.Meta
      //     avatar={<Avatar src={item.avatar} />}
      //     title={<a href={item.href}>{item.title}</a>}
      //     description={item.description}
      //   />
      //   {item.content}
      // </List.Item>
    )}
  />
  )
}

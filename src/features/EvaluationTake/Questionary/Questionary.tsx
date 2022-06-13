import React from 'react'
import { List } from 'antd';
import { Question } from 'features/EvaluationTake/Question';


const data = Array.from({ length: 23 }).map((_, i) => ({
  number: i + 1,
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
        pageSize: 1,
      }}
      dataSource={data}
      renderItem={(item) => (
        <Question 
          key={item.number} 
          onLevelChange={() => { }} 
          onEvidenceChange={() => { }} 
          number={item.number} 
        />
      )}
    />
  )
}

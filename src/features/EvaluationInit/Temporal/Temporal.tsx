import { MoreOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Menu, PageHeader, Row, Tag, Typography } from 'antd';
import React from 'react';

const { Paragraph } = Typography;

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            Inicio
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            Evaluaciones
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            Completar Evaluación
          </a>
        ),
      },
    ]}
  />
);

const DropdownMenu = () => (
  <Dropdown key="more" overlay={menu} placement="bottomRight">
    <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
  </Dropdown>
);

const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu',
  },
];

const IconLink = ({ src, text }: { src: string; text: string }) => (
  <a className="example-link">
    <img className="example-link-icon" src={src} alt={text} />
    {text}
  </a>
);

const content = (
  <>
    <Paragraph>
      Ant Design interprets the color system into two levels: a system-level color system and a
      product-level color system.
    </Paragraph>
    <Paragraph>
      Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
      easier for designers to have a clear psychological expectation of color when adjusting colors,
      as well as facilitate communication in teams.
    </Paragraph>
  </>
);

const Content: React.FC<{ children: React.ReactNode; extraContent: React.ReactNode }> = ({
  children,
  extraContent,
}) => (
  <Row>
    <div style={{ flex: 1 }}>{children}</div>
    <div className="image">{extraContent}</div>
  </Row>
);

export default function Temporal() {
  return (
    <Card>
      <PageHeader
      title="Evaluación"
      className="site-page-header"
      subTitle="This is a subtitle"
      tags={<Tag color="blue">Running</Tag>}
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
        <DropdownMenu key="more" />,
      ]}
      avatar={{
        children: '3.5'
      }}
      breadcrumb={{ routes }}
    >
      <Content
        extraContent={
          <img
            src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
            alt="content"
            width="100%"
          />
        }
      >
        {content}
      </Content>
    </PageHeader>
    </Card>
  );
}
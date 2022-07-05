import React from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, List, PageHeader, Space } from "antd";
import { ListItem } from "library/components/ListItem";
import { useDomainList } from "../EvaluationInit/DomainList/useDomainList";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: "https://joeschmoe.io/api/v1/random",
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

export default function DomainCrud() {
  const { domains } = useDomainList();
  const navigate = useNavigate();

  return (
    <Space style={{ width: "100%" }} size="large" direction="vertical">
      <PageHeader
        style={{ padding: 0 }}
        onBack={() => navigate("/")}
        title="Evaluaciones"
        subTitle="Lista de evaluaciones tomadas..."
        extra={
          <Button
            type="primary"
            size="large"
            shape="circle"
            icon={<UserOutlined />}
          />
        }
      />

      <Card
        title="Filtrar Dominios"
        extra={
          <Button type="primary" htmlType="submit">
            Aplicar
          </Button>
        }
      >
        <Form name="horizontal_login" layout="inline">
          <Form.Item name="username">
            <Input placeholder="Buscar" type="text" autoComplete="off" />
          </Form.Item>
          <Form.Item name="password">
            <Input type="text" placeholder="Estado" autoComplete="off" />
          </Form.Item>
          <Form.Item name="password">
            <Input type="text" placeholder="Por fecha" autoComplete="off" />
          </Form.Item>
          <Form.Item name="password">
            <Input type="text" placeholder="Activo" autoComplete="off" />
          </Form.Item>
          <Form.Item name="password" style={{ marginRight: "auto" }}>
            <Input type="text" placeholder="Acronimo" autoComplete="off" />
          </Form.Item>
        </Form>
      </Card>
      <Card title="Lista de Dominios">
        <List
          itemLayout="horizontal"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={domains}
          footer={
            <div>
              <b>ant design</b> footer part
            </div>
          }
          renderItem={(item) => (
            <ListItem
              key={item.id}
              actions={[
                <Button>Editar</Button>,
                <Button danger>Eliminar</Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar />}
                title={<a>{item.name}</a>}
                description="Lorem ipsum dolor sit amet consectetura, excepturi qui iusto doloremque dicta quasi?"
              />
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consequuntur voluptas ratione quam quia explicabo, architecto eius
              incidunt dolor suscipit ab repellat. Vel, pariatur a animi
              doloremque tenetur numquam nesciunt in.
            </ListItem>
          )}
        />
      </Card>
    </Space>
  );
}

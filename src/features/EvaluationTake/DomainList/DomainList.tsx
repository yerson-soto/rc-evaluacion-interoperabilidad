import React from "react";
import {
  Avatar,
  Button,
  Collapse,
  Divider,
  List,
  Typography,
  Card,
  Drawer,
  Space,
} from "antd";
import { Question } from "../Question";

import "./DomainList.css";
import { useDomainList } from "./useDomainList";
import { Box } from "library/components/Box";
import { Domain } from "../../../library/models/Domain";
import { Questionary } from "../Questionary";

const domains: Domain[] = [
  {
    id: 1,
    name: "Dominio Organizacional",
  },
  {
    id: 2,
    name: "Dominio Semantico",
  },
  {
    id: 3,
    name: "Dominio Politico Legal",
  },
];

export default function DomainList() {
  // const { isLoading, domains } = useDomainList();
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Card>
        <List
          loading={false}
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
          renderItem={(domain) => (
            <List.Item
              key={domain.id}
              actions={[
                <Button onClick={showDrawer}>Evaluar</Button>,
                <Button danger>Restablecer</Button>,
              ]}
              // extra="3.5"
            >
              <Box>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                    >
                      3.6
                    </Avatar>
                  }
                  title={domain.name}
                  description="reiciendis obcaecati earum, non commodi nihil corrupti "
                />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas
                exercitationem.
              </Box>
            </List.Item>
          )}
        />
      </Card>

      <Drawer
        title="Dominio Organizacional"
        placement="right"
        width={500}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Questionary />
      </Drawer>
    </>
  );
}

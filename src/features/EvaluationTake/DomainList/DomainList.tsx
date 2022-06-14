import React from "react";
import {
  Avatar,
  Button,
  Collapse,
  Divider,
  List,
  Typography,
  Card,
  Grid,
  Space,
  Progress,
  Popconfirm,
} from "antd";
import { Question } from "../Question";

import { Domain } from "library/models/Domain";
import { Questionary } from "features/EvaluationTake/Questionary";
import { ListItem } from "library/components/ListItem";

import "./DomainList.css";

const { useBreakpoint } = Grid;

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
  {
    id: 4,
    name: "Dominio Semantico Legal",
  },
];

export default function DomainList() {
  // const { isLoading, domains } = useDomainList();
  const [visible, setVisible] = React.useState(false);

  const { lg: isHorizontal } = useBreakpoint();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <React.Fragment>
      <Questionary isOpen={visible} onClose={onClose} />

      <Card>
        <List
          loading={false}
          itemLayout={isHorizontal ? "horizontal" : "vertical"}
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
            <ListItem
              key={domain.id}
              actions={[
                <Button onClick={showDrawer}>Evaluar</Button>,

                <Popconfirm
                  title="Seguro que deseas restablecer este dominio?"
                  onConfirm={() => {}}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Restablecer</Button>,
                </Popconfirm>,
              ]}
              // extra="3.5"
            >
              <List.Item.Meta
                avatar={
                  // <Avatar
                  //   style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  // >
                  //   3.6
                  // </Avatar>
                  //  <Progress type="circle" width={35} percent={67} />
                  <Progress
                    width={40}
                    type="circle"
                    // strokeColor={{
                    //   '0%': '#d57418',
                    //   '100%': '#339503',
                    // }}
                    format={() => "3.5"}
                    percent={40}
                  />
                }
                title={domain.name}
                description="reiciendis obcaecati earum, non commodi nihil corrupti "
                // description={
                //   <Progress  percent={30} />
                // }
              />
              <Typography.Text>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illo quod, exercitationem iste minima tenetur ipsam. Aliquam explicabo dolor molestias ipsam minima? Itaque beatae hic esse, unde facere minus laudantium!
              </Typography.Text>
              {/* <Progress type="circle" width={50} percent={30} /> */}
            </ListItem>
          )}
        />
      </Card>
    </React.Fragment>
  );
}

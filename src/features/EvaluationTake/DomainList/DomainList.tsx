import React from "react";
import { useTranslation } from "react-i18next";
import { Button, List, Typography, Card } from "antd";
import { Progress, Grid, Popconfirm } from 'antd';
import { Domain } from "library/models/Domain";
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

interface DomainListProps {
  onEvaluate: (domain: Domain) => void;
  onReset: (domain: Domain) => void;
}

export default function DomainList(props: DomainListProps) {
  const { onEvaluate, onReset } = props;
  // const { isLoading, domains } = useDomainList();
  const { lg: isHorizontal } = useBreakpoint();
  const { t } = useTranslation();

  return (
    <Card>
      <List
        loading={false}
        dataSource={domains}
        itemLayout={isHorizontal ? "horizontal" : "vertical"}
        size="large"
        pagination={{
          pageSize: 3,
        }}
        footer={
          <div>
            <b>{domains.length}</b> Dominios
          </div>
        }
        renderItem={(domain) => (
          <ListItem
            key={domain.id}
            actions={[
              <Button onClick={() => onEvaluate(domain)}>
                {t("buttons.evaluate")}
              </Button>,

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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Explicabo illo quod, exercitationem iste minima tenetur ipsam.
              Aliquam explicabo dolor molestias ipsam minima? Itaque beatae hic
              esse, unde facere minus laudantium!
            </Typography.Text>
          </ListItem>
        )}
      />
    </Card>
  );
}

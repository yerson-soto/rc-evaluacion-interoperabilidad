import React from "react";
import { useTranslation } from "react-i18next";
import { List, Typography, Card, Empty, Avatar } from "antd";
import { Progress } from "antd";
import { PaginationFooter } from "library/components/PaginationFooter";

import { AppBox } from "library/components/AppBox";
import { Questionary } from "../Questionary";
import { useListAction } from 'features/Crud/useListAction';
import { domainSlice } from 'redux/slices/domainSlice';
import { DomainService } from 'library/api/services/DomainService';
import { useToggleQuestionary } from '../Questionary/useToggleQuestionary';

import classes from "./DomainList.module.css";
import chroma from "chroma-js";


export default function DomainList() {
  const domainService = new DomainService()

  const { isLoading, results: domains } = useListAction({
    selectLoading: (state) => state.domains.isLoading,
    selectResults: (state) => state.domains.results,
    reducer: domainSlice,
    service: domainService
  });
  
  const { t } = useTranslation();
  const { open } = useToggleQuestionary();

  const colorRange = chroma
        .scale(["#fce4d7", "#fff1cf", "#feffd5", "#e2efda", "#c6e0b3"])
        .colors(domains.length);

  return (
    <React.Fragment>
      <List
        loading={isLoading}
        dataSource={domains}
        className={classes.container}
        grid={{
          gutter: 20,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        size="large"
        pagination={{
          pageSize: 10,
        }}
        locale={{
          emptyText: <Empty description={t("empty.domains")} />,
        }}
        footer={
          <PaginationFooter
            total={domains.length}
            label={t("pagination.domains")}
          />
        }
        renderItem={(domain, key) => (
          <List.Item 
            className={classes.item} 
            onClick={() => open(domain)}
          >
            <Card
              className={classes.itemCard}
              cover={
                <AppBox
                  style={{
                    height: "150px",
                    backgroundColor: colorRange[key],
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0 16px"
                  }}
                >
                  <Typography.Text
                    style={{
                      // color: "#ffffff",
                      fontSize: 20,
                      fontWeight: "bold",
                      textAlign: "center"
                    }}
                  >
                    Dominio {domain.name}
                  </Typography.Text>
                </AppBox>
              }
              bordered={false}
            >
              <List.Item.Meta
                avatar={
                <Avatar
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                  {domain.acronym}
                </Avatar>
              }
              title="2 criterios completados de 6"
              description={<Progress percent={30} />}
            />
              
            </Card>
          </List.Item>
  
        )}
      />
      <Questionary />
      </React.Fragment>
  );
}

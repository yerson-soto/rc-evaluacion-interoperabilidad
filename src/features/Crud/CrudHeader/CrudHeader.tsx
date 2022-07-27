import React from "react";
import { useTranslation } from 'react-i18next';
import { ExportOutlined } from "@ant-design/icons";
import { Button, Space, Card } from "antd";
import { AppBox } from "library/components/AppBox";

import classes from "./CrudHeader.module.css";

// TODO: Delete this
export default function CrudHeader() {
  const { t } = useTranslation();
  
  return (
    <Card style={{ marginBottom: 30 }}>
      <AppBox className={classes.box}>
        <AppBox className={classes.title}>
          {t("headings.domain_list")}
        </AppBox>

        <Space direction="horizontal">
          <Button 
            shape="round" 
            icon={<ExportOutlined />} 
            block
          />
          {/* <CreateAction /> */}
        </Space>
      </AppBox>
    </Card>
  );
}

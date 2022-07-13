import React from "react";
import { useTranslation } from 'react-i18next';
import { ExportOutlined } from "@ant-design/icons";
import { Button, Space, Card } from "antd";
import { Box } from "library/components/Box";
import { CreateAction } from "../CreateAction";

import classes from "./CrudHeader.module.css";

export default function CrudHeader() {
  const { t } = useTranslation();
  
  return (
    <Card style={{ marginBottom: 30 }}>
      <Box className={classes.box}>
        <Box className={classes.title}>
          {t("headings.domain_list")}
        </Box>

        <Space direction="horizontal">
          <Button 
            shape="round" 
            icon={<ExportOutlined />} 
            block
          />
          {/* <CreateAction /> */}
        </Space>
      </Box>
    </Card>
  );
}

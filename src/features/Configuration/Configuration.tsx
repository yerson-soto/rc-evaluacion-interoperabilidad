import React from "react";
import { Card, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { paths } from "library/common/constants";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { PasswordConfig } from "./PasswordConfig";
import { AppBox } from "library/components/AppBox";
import { GeneralConfig } from "./GeneralConfig";


export default function Configuration() {
  const { tab } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleTabChange = (tab: string): void => {
    const tabPath = paths.admin.settings.target.reverse({ tab });
    navigate(tabPath);
  };

  return (
    <Card>
      <Tabs
        tabPosition="left"
        defaultActiveKey={tab}
        onChange={handleTabChange}
        destroyInactiveTabPane
      >
        <Tabs.TabPane
          tab={
            <span>
              <UserOutlined />
              {t("settings.general")}
            </span>
          }
          key="general"
        >
          <AppBox style={{ maxWidth: '600px' }}>
            <GeneralConfig />
          </AppBox>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <span>
              <LockOutlined />
              {t("settings.password")}
            </span>
          }
          key="contrasena"
        >
          <AppBox style={{ maxWidth: '600px' }}>
            <PasswordConfig />
          </AppBox>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}

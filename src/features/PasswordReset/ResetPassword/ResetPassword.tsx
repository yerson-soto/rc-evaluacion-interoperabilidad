import React from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useTranslation } from 'react-i18next';

export default function ResetPassword() {
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      size="large"
      name="reset_password"
      onFinish={onFinish}
    >
      <Space style={{ width: '100%' }} direction="vertical" size="small">
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder={t("fields.password")}
          />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          rules={[{ required: true, message: "Please input your Password Confirmation!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder={t("fields.confirm_password")}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {t("buttons.reset_password")}
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
}

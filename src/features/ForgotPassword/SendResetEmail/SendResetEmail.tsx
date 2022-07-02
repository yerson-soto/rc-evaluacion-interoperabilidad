import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useTranslation } from 'react-i18next';

export default function SendResetEmail() {
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
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input
          prefix={<MailOutlined />}
          type="email"
          placeholder={t("fields.email")}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {t("buttons.send_reset_email")}
        </Button>
      </Form.Item>
    </Form>
  );
}

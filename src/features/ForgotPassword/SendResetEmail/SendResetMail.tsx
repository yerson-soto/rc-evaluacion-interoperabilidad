import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

interface SendResetMailProps {
  isLoading: boolean;
  onSendMail: (email: string) => Promise<void>;
}

interface FormValues {
  email: string;
}

export default function SendResetMail(props: SendResetMailProps) {
  const { t } = useTranslation();
  const { onSendMail, isLoading } = props;

  const onFinish = (values: FormValues) => {
    onSendMail(values.email);
  };

  return (
    <Form size="large" name="reset_password" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ 
          required: true, 
          message: t("rules.required", { field: t("fields.email")}) 
        }]}
      >
        <Input
          prefix={<MailOutlined />}
          type="email"
          placeholder={t("fields.email")}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          {t("buttons.send_reset_email")}
        </Button>
      </Form.Item>
    </Form>
  );
}

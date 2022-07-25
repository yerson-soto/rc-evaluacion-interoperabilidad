import React from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useTranslation } from "react-i18next";

interface ResetPasswordProps {
  isLoading: boolean;
  onReset: (password: string) => Promise<void>;
}

interface FormValues {
  password: string;
  confirm_password: string;
}

export default function ResetPassword(props: ResetPasswordProps) {
  const { t } = useTranslation();
  const { isLoading, onReset } = props;

  const onFinish = (values: FormValues) => {
    if (values.password === values.confirm_password) {
      onReset(values.password);
    }
  };

  return (
    <Form size="large" name="reset_password" onFinish={onFinish}>
      <Space style={{ width: "100%" }} direction="vertical" size="small">
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
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: "Please input your Password Confirmation!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder={t("fields.confirm_password")}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            {t("buttons.reset_password")}
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
}

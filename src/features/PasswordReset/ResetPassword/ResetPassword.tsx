import React from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useTranslation } from "react-i18next";
import { ResetFormSchema, rules } from './ResetFormSchema';

interface ResetPasswordProps {
  isLoading: boolean;
  onReset: (password: string) => Promise<void>;
}

export default function ResetPassword(props: ResetPasswordProps) {
  const { t } = useTranslation();
  const { isLoading, onReset } = props;

  const onFinish = (values: ResetFormSchema) => {
    if (values.password === values.confirmPassword) {
      onReset(values.password);
    }
  };

  return (
    <Form size="large" name="reset_password" onFinish={onFinish}>
      <Space style={{ width: "100%" }} direction="vertical" size="middle">
        <Form.Item
          name="password"
          rules={rules.password}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder={t("fields.password")}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={rules.confirmPassword}
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

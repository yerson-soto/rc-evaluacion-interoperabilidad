import React from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useTranslation } from "react-i18next";
import { ChangePasswordFormSchema, rules } from './PasswordFormSchema';

interface ChangePasswordProps {
  isLoading: boolean;
  onSave: (password: string, newPassword: string) => Promise<void>;
}

export default function ChangePassword(props: ChangePasswordProps) {
  const { t } = useTranslation();
  const { isLoading, onSave } = props;

  const onFinish = (values: ChangePasswordFormSchema) => {
    if (values.password === values.confirmPassword) {
      onSave(values.password, values.newPassword);
    }
  };

  return (
    <Form layout="vertical" name="change_password" onFinish={onFinish}>
      <Form.Item
        name="password"
        label={t("labels.current_password")}
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
        label={t("labels.new_password")}
        rules={rules.newPassword}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder={t("fields.new_password")}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label={t("labels.confirm_password")}
        dependencies={['newPassword']}
        rules={rules.confirmPassword}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder={t("fields.confirm_password")}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {t("buttons.change_password")}
        </Button>
      </Form.Item>
    </Form>
  );
}

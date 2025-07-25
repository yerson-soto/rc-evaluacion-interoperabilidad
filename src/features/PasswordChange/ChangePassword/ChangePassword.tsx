import React from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useTranslation } from "react-i18next";
import { ChangePasswordFormSchema, rules } from './PasswordFormSchema';
import { useAppSelector } from 'redux/hooks';
import { useForm } from "antd/es/form/Form";

interface ChangePasswordProps {
  isLoading: boolean;
  onSave: (data: ChangePasswordFormSchema) => Promise<void>;
}

export default function ChangePassword(props: ChangePasswordProps) {
  const email = useAppSelector(state => state.auth.user.email);
  const [form] = useForm<ChangePasswordFormSchema>();
  const { t } = useTranslation();
  const { isLoading, onSave } = props;

  const onFinish = (values: ChangePasswordFormSchema) => {
    if (values.newPassword === values.confirmPassword) {
      onSave(values).then(() => form.resetFields());
    }
  };

  return (
    <Form 
      form={form}
      autoComplete="off" 
      layout="vertical" 
      name="change_password" 
      onFinish={onFinish}
      initialValues={{ email }}
    >
      <Space style={{ width: "100%" }} direction="vertical" size="small">
        <Form.Item name="email" hidden>
          <Input type="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label={t("labels.current_password")}
          rules={rules.password}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder={t("fields.password")}
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
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
      </Space>
    </Form>
  );
}

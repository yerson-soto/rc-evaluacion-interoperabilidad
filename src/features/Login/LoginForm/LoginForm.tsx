import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { Link } from "react-router-dom";
import { paths } from "library/common/constants";
import { AppBox } from "library/components/AppBox";
import { useTranslation } from "react-i18next";
import { LoginFormSchema, rules } from './LoginFormSchema';

import classes from "./LoginForm.module.css";

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: (username: string, password: string, remember: boolean) => void;
}

export default function LoginForm(props: LoginFormProps) {
  const { t } = useTranslation();

  const { isLoading, onSubmit } = props;

  const onFinish = (values: LoginFormSchema) => {
    const { username, password, remember } = values;
    onSubmit(username, password, remember);
  };

  return (
    <Form
      size="large"
      name="login"
      onFinish={onFinish}
      initialValues={{ remember: true }}
    >
      <Space 
        className={classes.space} 
        direction="vertical" 
        size="middle"
      >
        <Form.Item
          name="username"
          rules={rules.username}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={t("fields.email")}
          />
        </Form.Item>

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
      </Space>
      
      <Form.Item>
        <AppBox className={classes.forgotWrapper}>
          <Form.Item 
            name="remember" 
            valuePropName="checked" 
            noStyle
          >
            <Checkbox>{t("fields.remember")}</Checkbox>
          </Form.Item>

          <Link
            className={classes.forgotPassword}
            to={paths.auth.forgotPassword.fullPath}
          >
            {t("links.forgot_password")}
          </Link>
        </AppBox>
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={isLoading} 
          block
        >
          {t("buttons.login")}
        </Button>
      </Form.Item>
    </Form>
  );
}

import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { Link } from "react-router-dom";
import { paths } from "library/common/constants";
import { Box } from "library/components/Box";
import { useTranslation } from 'react-i18next';

import classes from "./LoginForm.module.css";

// interface LoginFormProps {
//   onSubmit: () =>
// }

interface FormValues {
  username: string;
  password: string;
  remember: boolean;
}

export default function LoginForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm<FormValues>();
  
  const onFinish = (values: FormValues) => {
    console.log("Received values of form: ", values);
    form.resetFields()
  };
  
  return (
    <Form
      size="large"
      name="login"
      initialValues={{ remember: true }}
      form={form}
      onFinish={onFinish}
    >
      <Space className={classes.space} direction="vertical" size="small">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={t("fields.username")}
          />
        </Form.Item>
          
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t("fields.password")}
          />
        </Form.Item>
      </Space>
      <Form.Item>
        <Box className={classes.forgotWrapper}>
          <Form.Item
            name="remember"
            valuePropName="checked"
            noStyle
          >
            <Checkbox>{t("fields.remember")}</Checkbox>
          </Form.Item>

          <Link
            className={classes.forgotPassword}
            to={paths.auth.forgotPassword.reverse()}
          >
            {t("links.forgot_password")}
          </Link>
        </Box>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {t("buttons.login")}
        </Button>
      </Form.Item>
    </Form>
  );
}

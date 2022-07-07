import React from "react";
import { useTranslation } from "react-i18next";
import { LinkOutlined, BuildOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { AddDomainSchema, rules } from "./AddDomainSchema";
import createSlug from "library/helpers/create-slug";

interface AddDomainProps {
  show: boolean;
  onCreate: (values: AddDomainSchema) => void;
  onCancel: () => void;
}

export default function AddDomain(props: AddDomainProps) {
  const [form] = Form.useForm<AddDomainSchema>();
  const { show, onCancel, onCreate } = props;
  const { t } = useTranslation();

  const onFinish = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      onCreate(values);
    });
  };

  const populateSlug = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    form.setFieldsValue({ slug: createSlug(value) });
  };

  const handleCloseEnd = () => {
    form.resetFields();
  };

  return (
    <AppDrawer
      title={t("headings.create_domain")}
      placement="right"
      onClose={onCancel}
      visible={show}
      onCloseEnd={handleCloseEnd}
      extra={
        <Button type="primary" onClick={onFinish}>
          {t("buttons.create")}
        </Button>
      }
    >
      <Form
        form={form}
        name="create_domain"
        size="large"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label={t("fields.domain")}
          rules={rules.name}
        >
          <Input
            suffix={<BuildOutlined />}
            placeholder={t("placeholders.domain")}
            onChange={populateSlug}
          />
        </Form.Item>
        <Form.Item
          name="slug"
          label={t("fields.slug")}
          help={t("hints.slug")}
          rules={rules.slug}
        >
          <Input
            suffix={<LinkOutlined />}
            type="url"
            placeholder={t("placeholders.slug")}
          />
        </Form.Item>
      </Form>
    </AppDrawer>
  );
}

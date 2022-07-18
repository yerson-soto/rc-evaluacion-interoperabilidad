import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, Select } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { AppDrawer } from "library/components/AppDrawer";
import { UserFormSchema, rules } from "./UserFormSchema";
import { useUserForm } from "./useUserForm";

interface UserFormProps {
  show: boolean;
  isLoading: boolean;
  defaults?: UserFormSchema;
  isEdit?: boolean;
  onSave: (values: UserFormSchema) => Promise<void>;
  onHide: () => void;
}

export default function UserForm(props: UserFormProps) {
  const { form, organizations, resetForm } = useUserForm();
  const { show, isEdit, isLoading, defaults, onHide, onSave } = props;
  const { t } = useTranslation();

  const title = isEdit
    ? t("headings.edit_user")
    : t("headings.create_user");

  const btnText = isEdit 
    ? t("buttons.save") 
    : t("buttons.create");

  const formName = isEdit 
    ? "edit_user" 
    : "create_user";

  const onFinish = () => {
    form.validateFields().then((values) => {
      onSave(values).then(onHide);
    });
  };

  return (
    <AppDrawer
      title={title}
      placement="right"
      onClose={onHide}
      visible={show}
      onCloseEnd={resetForm}
      extra={
        <Button 
          type="primary" 
          onClick={onFinish}
          loading={isLoading}
        >
          {btnText}
        </Button>
      }
    >
      {show && (
        <Form
          form={form}
          name={formName}
          preserve={false}
          onFinish={onFinish}
          initialValues={defaults}
          size="large"
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="firstName"
            label={t("fields.firstName")}
            rules={rules.firstName}
          >
            <Input 
              suffix={<UserOutlined />}
              type="text"
              placeholder={t("placeholders.firstName")}
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            label={t("fields.lastName")}
            rules={rules.lastName}
          >
            <Input 
              suffix={<UserOutlined />}
              type="text"
              placeholder={t("placeholders.lastName")}
            />
          </Form.Item>

          <Form.Item
            name="organizationId"
            label={t("fields.organization")}
            rules={rules.organizationId}
          >
            <Select
              showSearch
              placeholder={t("placeholders.select_organization")}
              optionFilterProp="children"
            >
              {organizations.map((organization) => (
                <Select.Option 
                  key={organization.id} 
                  value={organization.id}
                >
                  {organization.name} ({organization.acronym})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label={t("fields.email")}
            rules={rules.email}
          >
            <Input 
              suffix={<MailOutlined />}
              type="text"
              placeholder={t("placeholders.email")}
            />
          </Form.Item>

          <Form.Item
            name="type"
            label={t("fields.user_type")}
            rules={rules.type}
          >
            <Select
              showSearch
              placeholder={t("placeholders.select_user_type")}
              optionFilterProp="children"
            >
              {organizations.map((organization) => (
                <Select.Option 
                  key={organization.id} 
                  value={organization.id}
                >
                  {organization.name} ({organization.acronym})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      )}
    </AppDrawer>
  );
}

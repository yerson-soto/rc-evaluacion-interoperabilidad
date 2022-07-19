import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, Form, Input, Select } from "antd";
import { IdcardOutlined, MailOutlined } from "@ant-design/icons";
import { AppDrawer } from "library/components/AppDrawer";
import { UserFormSchema, rules } from "./UserFormSchema";
import { useUserForm } from "./useUserForm";
import { MaskedInput } from 'antd-mask-input';
import { UserType } from '../../../library/common/enums';

interface UserFormProps {
  show: boolean;
  isLoading: boolean;
  defaults?: UserFormSchema;
  isEdit?: boolean;
  onSave: (values: UserFormSchema) => Promise<void>;
  onHide: () => void;
}

export default function UserForm(props: UserFormProps) {
  const { show, isEdit, isLoading, defaults, onHide, onSave } = props;
  const { t } = useTranslation();
  const { 
    form, 
    organizations, 
    domainNotFound, 
    emailDomain, 
    changeDomain, 
    resetForm 
  } = useUserForm();

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
      const email = values.email + emailDomain;

      onSave({ ...values, email }).then(onHide);
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
            name="identification"
            label={t("fields.identification")}
            rules={rules.identification}
          >
            <MaskedInput 
              size="large" 
              suffix={<IdcardOutlined />} 
              mask="000-0000000-0" 
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
              onChange={changeDomain}
            >
              {organizations.map((organization) => (
                <Select.Option 
                  key={organization.id} 
                  value={organization.id}
                >
                  {organization.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {domainNotFound && (
            <Alert 
              type="warning" 
              message={t("texts.email_domain_not_found")} 
            />
          )}

          {emailDomain && (
            <Form.Item
              name="email"
              label={t("fields.email")}
              rules={rules.email}
            >
              <Input 
                addonAfter={emailDomain}
                placeholder={t("placeholders.email")}
              />
            </Form.Item>
          )}

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
              <Select.Option key="1" value={UserType.Admin}>
                Administrador
              </Select.Option>
              <Select.Option key="2" value={UserType.Role2}>
                Técnico
              </Select.Option>
              <Select.Option key="3" value={UserType.Role3}>
                Analista
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      )}
    </AppDrawer>
  );
}

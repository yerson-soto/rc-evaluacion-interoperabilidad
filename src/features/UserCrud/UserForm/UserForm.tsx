import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, Form, Input } from "antd";
import { IdcardOutlined, LoadingOutlined } from "@ant-design/icons";
import { AppDrawer } from "library/components/AppDrawer";
import { UserFormSchema, rules } from "./UserFormSchema";
import { useUserForm } from "./useUserForm";
import { MaskedInput } from 'antd-mask-input';
import { InstitutionSelect } from "library/components/InstitutionSelect";
import { RoleSelect } from "../RoleSelect";

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
    domainNotFound, 
    emailDomain, 
    changeEmailDomain, 
    onIdentityChange,
    isVerifying,
    isInvalid,
    identity,
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

  const identityCardIcon = isVerifying 
    ? <LoadingOutlined /> 
    : <IdcardOutlined />;

  const identityHelp = isInvalid 
    ? t("rules.invalid_identity_card") 
    : identity?.fullName

  const onFinish = () => {
    form.validateFields().then((values) => {
      const email = values.email + emailDomain;
      const identification = values.identification.replaceAll('-', '');

      onSave({ ...values, identification, email }).then(onHide);
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
            validateStatus={isInvalid ? "error" : "success"}
            help={identityHelp}
            hasFeedback
          >
            <MaskedInput 
              size="large" 
              mask="000-0000000-0"
              suffix={identityCardIcon} 
              onChange={onIdentityChange}
            />
          </Form.Item>

          <Form.Item
            name="organizationId"
            label={t("fields.organization")}
            rules={rules.organizationId}
          >
            <InstitutionSelect
              placeholder={t("placeholders.select_organization")}
              onInstitutionChange={changeEmailDomain}
            />
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
            <RoleSelect 
              placeholder={t("placeholders.select_user_type")}
            />
          </Form.Item>
        </Form>
      )}
    </AppDrawer>
  );
}

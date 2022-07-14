import React from "react";
import { useTranslation } from "react-i18next";
import { LinkOutlined, BuildOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { DomainFormSchema, rules } from "./DomainFormSchema";
import { useDomainForm } from './useDomainForm';
import createSlug from "library/helpers/create-slug";

interface DomainFormProps {
  show: boolean;
  isLoading: boolean;
  defaults?: DomainFormSchema;
  isEdit?: boolean;
  onSave: (values: DomainFormSchema) => Promise<void>;
  onHide: () => void;
}

export default function DomainForm(props: DomainFormProps) {
  const { show, isEdit, isLoading, defaults, onHide, onSave } = props;
  const { t } = useTranslation();

  const { 
    form, 
    normalizeAcronym, 
    normalizeSlug, 
    populateSlug,
    resetForm  
  } = useDomainForm();

  const title = isEdit 
    ? t("headings.edit_domain"): 
    t("headings.create_domain");

  const btnText = isEdit 
    ? t("buttons.save") 
    : t("buttons.create");

  const formName = isEdit 
    ? 'edit_domain' 
    : 'create_domain';
  

  const onFinish = () => {
    form.validateFields().then((values) => {
      // Make sure slug is valid
      const slug = createSlug(values.slug);

      onSave({ ...values, slug }).then(onHide);
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
            extra={t("hints.slug")}
            rules={rules.slug}
            normalize={normalizeSlug}
          >
            <Input
              suffix={<LinkOutlined />}
              type="text"
              placeholder={t("placeholders.slug")}
            />
          </Form.Item>

          <Form.Item
            name="acronym"
            label={t("fields.domain_acronym")}
            extra={t("hints.domain_acronym")}
            rules={rules.acronym}
            normalize={normalizeAcronym}
          >
            <Input
              suffix={<LinkOutlined />}
              type="text"
              placeholder={t("placeholders.domain_acronym")}
            />
          </Form.Item>
        </Form>
      )}
    </AppDrawer>
  );
}

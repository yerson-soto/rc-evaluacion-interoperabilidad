import React from "react";
import { useTranslation } from "react-i18next";
import { LinkOutlined, BuildOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { DomainFormSchema, rules } from "./DomainFormSchema";
import createSlug from "library/helpers/create-slug";

interface AddDomainProps {
  show: boolean;
  isLoading: boolean;
  defaults?: DomainFormSchema;
  isEdit?: boolean;
  onSave: (values: DomainFormSchema) => Promise<void>;
  onHide: () => void;
}

export default function DomainForm(props: AddDomainProps) {
  const [form] = Form.useForm<DomainFormSchema>();
  const { show, isEdit, isLoading, defaults, onHide, onSave } = props;
  const { t } = useTranslation();

  const title = isEdit 
    ? t("headings.edit_domain")
    : t("headings.create_domain");

  const btnText = isEdit 
    ? t("buttons.save")
    : t("buttons.create");

  const formName = isEdit
    ? 'edit_domain'
    : 'create_domain';
  
  // TODO: Refactor this, hint: useHook
  const onFinish = () => {
    form.validateFields().then((values) => {

      // Make sure slug is valid
      const slug = createSlug(values.slug);
      
      onSave({ ...values, slug }).then(onHide);
    });
  };

  const populateSlug = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const slug = createSlug(value),
      acronym = normalizeAcronym(value.substring(0, 2));

    form.setFieldsValue({ slug });
    form.setFieldsValue({ acronym });
  };

  const handleCloseEnd = () => {
    form.resetFields();
  };

  const normalizeAcronym = (acronym: string) => {
    return acronym
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  }

  const normalizeSlug = (slug: string) => {
    return slug.replaceAll(' ', '-').toLowerCase()
  };

  return (
    <AppDrawer
      title={title}
      placement="right"
      onClose={onHide}
      visible={show}
      onCloseEnd={handleCloseEnd}
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

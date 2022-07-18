import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Select } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { LineamentFormSchema, rules } from "./LineamentFormSchema";
import { useLineamentForm } from "./useLineamentForm";
import { TextArea } from "library/components/TextArea";

interface LineamentFormProps {
  show: boolean;
  isLoading: boolean;
  defaults?: LineamentFormSchema;
  isEdit?: boolean;
  onSave: (values: LineamentFormSchema) => Promise<void>;
  onHide: () => void;
}

export default function LineamentForm(props: LineamentFormProps) {
  const { form, domains, resetForm } = useLineamentForm();
  const { show, isEdit, isLoading, defaults, onHide, onSave } = props;
  const { t } = useTranslation();

  const title = isEdit
    ? t("headings.edit_lineament")
    : t("headings.create_lineament");

  const btnText = isEdit 
    ? t("buttons.save") 
    : t("buttons.create");

  const formName = isEdit 
    ? "edit_lineament" 
    : "create_lineament";

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
            name="domainId"
            label={t("fields.domain")}
            rules={rules.domainId}
          >
            <Select
              showSearch
              placeholder={t("placeholders.select_domain")}
              optionFilterProp="children"
            >
              {domains.map((domain) => (
                <Select.Option 
                  key={domain.id} 
                  value={domain.id}
                >
                  {domain.name} ({domain.acronym})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label={t("fields.description")}
            rules={rules.description}
          >
            <TextArea
              placeholder={t("placeholders.lineament_description")}
              maxLength={300}
              allowClear
              showCount
            />
          </Form.Item>
        </Form>
      )}
    </AppDrawer>
  );
}

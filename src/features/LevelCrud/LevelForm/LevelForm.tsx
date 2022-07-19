import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input } from "antd";
import { OrderedListOutlined } from '@ant-design/icons';
import { AppDrawer } from "library/components/AppDrawer";
import { LevelFormSchema, rules } from "./LevelFormSchema";
import { useLevelForm } from "./useLevelForm";
import { TextArea } from "library/components/TextArea";

interface LevelFormProps {
  show: boolean;
  isLoading: boolean;
  defaults?: LevelFormSchema;
  isEdit?: boolean;
  onSave: (values: LevelFormSchema) => Promise<void>;
  onHide: () => void;
}

export default function LevelForm(props: LevelFormProps) {
  const { form, resetForm, normalizeName } = useLevelForm();
  const { show, isEdit, isLoading, defaults, onHide, onSave } = props;
  const { t } = useTranslation();

  const title = isEdit
    ? t("headings.edit_level")
    : t("headings.create_level");

  const btnText = isEdit 
    ? t("buttons.save") 
    : t("buttons.create");

  const formName = isEdit 
    ? "edit_level" 
    : "create_level";

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
          {/* <Form.Item
            name="value"
            label={t("fields.level")}
            rules={rules.name}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1} 
              max={100}
              placeholder={t("placeholders.level_value")}
            />
          </Form.Item> */}

          <Form.Item
            name="name"
            label={t("fields.name")}
            rules={rules.name}
            normalize={normalizeName}
          >
            <Input
              suffix={<OrderedListOutlined />}
              type="text"
              placeholder={t("placeholders.level_name")}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={t("fields.description")}
            rules={rules.description}
          >
            <TextArea
              placeholder={t("placeholders.level_description")}
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

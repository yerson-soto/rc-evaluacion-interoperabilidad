import React from "react";
import { useTranslation } from "react-i18next";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { EvaluationFormSchema, rules } from "./EvaluationFormSchema";
import { useEvaluationForm } from './useEvaluationForm';


interface EvaluationFormProps {
  show: boolean;
  isLoading: boolean;
  defaults?: EvaluationFormSchema;
  isEdit?: boolean;
  onSave: (values: EvaluationFormSchema) => Promise<void>;
  onHide: () => void;
}

export default function EvaluationForm(props: EvaluationFormProps) {
  const { show, isEdit, isLoading, defaults, onHide, onSave } = props;
  const { t } = useTranslation();

  const {  form, orgOptions, resetForm } = useEvaluationForm();

  const title = isEdit 
    ? t("headings.edit_evaluation"): 
    t("headings.create_evaluation");

  const btnText = isEdit 
    ? t("buttons.save") 
    : t("buttons.create");

  const formName = isEdit 
    ? 'edit_evaluation' 
    : 'create_evaluation';

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
            name="organizationId"
            label={t("fields.organization")}
            rules={rules.organizationId}
          >
            <Select
              showSearch
              placeholder={t("placeholders.select_organization")}
              optionFilterProp="children"
              options={orgOptions}
            />
          </Form.Item>
          
          <Form.Item
            name="startDate"
            label={t("fields.startDate")}
            extra={t("hints.startDate")}
            rules={rules.startDate}
          >
            <DatePicker.RangePicker />
          </Form.Item>
        </Form>
      )}
    </AppDrawer>
  );
}

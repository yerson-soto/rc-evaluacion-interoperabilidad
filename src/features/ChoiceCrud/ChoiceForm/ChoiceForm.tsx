import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Form } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { ChoiceFormSchema, rules } from "./ChoiceFormSchema";
import { useChoiceForm } from "./useChoiceForm";
import { TextArea } from "library/components/TextArea";
import { CriterionSelect } from "../CriterionSelect";
import { LevelSelect } from "../LevelSelect";

interface ChoiceFormProps {
  show: boolean;
  isLoading: boolean;
  defaults?: ChoiceFormSchema;
  isEdit?: boolean;
  onSave: (values: ChoiceFormSchema) => Promise<void>;
  onHide: () => void;
}

export default function ChoiceForm(props: ChoiceFormProps) {
  const { form, resetForm } = useChoiceForm();
  const { show, isEdit, isLoading, defaults, onHide, onSave } = props;
  const { t } = useTranslation();

  const title = isEdit
    ? t("headings.edit_choice")
    : t("headings.create_choice");

  const btnText = isEdit 
    ? t("buttons.save") 
    : t("buttons.create");

  const formName = isEdit 
    ? "edit_choice" 
    : "create_choice";

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
            name="levelId"
            label={t("fields.level")}
            rules={rules.levelId}
          >
            <LevelSelect 
              placeholder={t("placeholders.select_level")}
            />
          </Form.Item>

          <Form.Item
            name="criterionId"
            label={t("fields.criterion")}
            rules={rules.criterionId}
          >
            <CriterionSelect 
              placeholder={t("placeholders.select_criterion")}
            />
          </Form.Item>

          <Form.Item
            name="details"
            label={t("fields.response")}
            rules={rules.details}
          >
            <TextArea
              placeholder={t("placeholders.choice_description")}
              maxLength={400}
              allowClear
              showCount
            />
          </Form.Item>
        </Form>
      )}
    </AppDrawer>
  );
}

import React from "react";
import { useTranslation } from "react-i18next";
import { CompressOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { CriterionFormSchema, rules } from "./CriterionFormSchema";
import { useCriterionForm } from "./useCriterionForm";
import { LineamentSelect } from "../LineamentSelect";

interface CriterionFormProps {
  show: boolean;
  isLoading: boolean;
  defaults?: CriterionFormSchema;
  isEdit?: boolean;
  onSave: (values: CriterionFormSchema) => Promise<void>;
  onHide: () => void;
}

export default function CriterionForm(props: CriterionFormProps) {
  const { form, resetForm, changeLineaments } = useCriterionForm();
  const { show, isEdit, isLoading, defaults, onHide, onSave } = props;
  const { t } = useTranslation();

  const title = isEdit
    ? t("headings.edit_criterion")
    : t("headings.create_criterion");

  const btnText = isEdit 
    ? t("buttons.save") 
    : t("buttons.create");

  const formName = isEdit 
    ? "edit_criterion" 
    : "create_criterion";

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
            name="name"
            label={t("fields.criterion")}
            rules={rules.name}
          >
            <Input
              suffix={<CompressOutlined />}
              type="text"
              placeholder={t("placeholders.criterion")}
            />
          </Form.Item>

          <Form.Item
            name="lineaments"
            label={t("fields.lineaments")}
            rules={rules.lineaments}
          > 
            <LineamentSelect
              mode="multiple"
              style={{ width: '100%' }}
              placeholder={t("placeholders.select_lineaments")}
              maxTagCount="responsive"
              onChangeLineaments={changeLineaments}
            />
          </Form.Item>
        </Form>
      )}
    </AppDrawer>
  );
}

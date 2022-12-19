import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { EvaluationFormSchema, rules } from "./EvaluationFormSchema";
import { useEvaluationForm } from './useEvaluationForm';
import { InstitutionSelect } from "library/components/InstitutionSelect";
import { useAppSelector } from 'redux/hooks';
import { ManagerSelect } from "../ManagerSelect";
import { DatetimePicker } from "../DatetimePicker";
import { UserType } from 'library/common/enums';

interface EvaluationFormProps {
  show: boolean;
  isLoading: boolean;
  defaults?: EvaluationFormSchema;
  isEdit?: boolean;
  onSave: (values: EvaluationFormSchema) => Promise<void>;
  onHide: () => void;
}
// TODO: Refactor extra fields
export default function EvaluationForm(props: EvaluationFormProps) {
  const { show, isEdit, isLoading, defaults, onHide, onSave } = props;
  const { t } = useTranslation();

  // Todo: Refactor source of userId. Should be from select field.
  const user = useAppSelector(state => state.auth.user);
  const isAdmin = user.type === UserType.Admin;

  const {  form, resetForm } = useEvaluationForm();

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
      onSave({ ...values, userId: user.uid }).then(onHide);
    });
  };
  
  return (
    <AppDrawer
      placement="right"
      title={title}
      onClose={onHide}
      open={show}
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
          requiredMark="optional"
        >
          <Form.Item
            name="organizationId"
            label={t("fields.organization")}
            rules={rules.organizationId}
          >
            <InstitutionSelect
              placeholder={t("placeholders.select_organization")}
            />
          </Form.Item>
          
          {isAdmin && (
            <Form.Item
              name="supportId"
              label={t("fields.manager")}
            >
              <ManagerSelect
                placeholder={t("placeholders.select_manager")}
              />
            </Form.Item>
          )}

          <Form.Item>
            <Form.Item 
              name="isScheduled" 
              valuePropName="checked" 
              noStyle
            >
              <Checkbox>{t("fields.schedule_evaluation")}</Checkbox>
            </Form.Item>
          </Form.Item>
          
          <Form.Item
            noStyle
            preserve={false}
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.isScheduled !== currentValues.isScheduled
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("isScheduled") ? (
                <Form.Item
                  name="startDate"
                  label={t("fields.start_date")}
                  extra={t("hints.start_date")}
                  rules={rules.startDate}
                >
                  <DatetimePicker 
                    placeholder={t("placeholders.select_start_date")} 
                    style={{ width: '100%' }} 
                  />
                </Form.Item> 
              ) : null
            }
          </Form.Item>
        </Form>
      )}
    </AppDrawer>
  );
}

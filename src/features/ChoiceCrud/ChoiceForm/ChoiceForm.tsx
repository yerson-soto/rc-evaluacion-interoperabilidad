import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Divider, Form, Input, Space } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { ChoiceFormSchema, rules, evidenceRules } from "./ChoiceFormSchema";
import { useChoiceForm } from "./useChoiceForm";
import { TextArea } from "library/components/TextArea";
import { CriterionSelect } from "../CriterionSelect";
import { LevelSelect } from "../LevelSelect";

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { RecordSelect } from "library/components/RecordSelect";
import { contentTypeLabels } from 'library/common/constants';

interface ChoiceFormProps {
  show: boolean;
  isLoading: boolean;
  defaults?: ChoiceFormSchema;
  isEdit?: boolean;
  onSave: (values: ChoiceFormSchema) => Promise<void>;
  onHide: () => void;
  hiddenFields?: (keyof ChoiceFormSchema)[];
}

export default function ChoiceForm(props: ChoiceFormProps) {
  const { form, resetForm, onRemoveEvidence } = useChoiceForm();
  const { show, isEdit, isLoading, defaults, onHide, onSave, hiddenFields } = props;
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

  const requiredEvidences = defaults?.isEvidenceRequired 
    ? defaults.requiredEvidences 
    : [{ contentType: [], title: '' }];
    
  const defaultValues = Boolean(defaults) 
    ? { ...defaults, requiredEvidences } 
    : { requiredEvidences };
    
  const onFinish = () => {
    form.validateFields().then((values) => {
      console.log(values);
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
          initialValues={defaultValues}
          size="large"
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="levelId"
            label={t("fields.level")}
            rules={rules.levelId}
            hidden={hiddenFields?.includes('levelId')}
          >
            <LevelSelect 
              placeholder={t("placeholders.select_level")}
            />
          </Form.Item>

          <Form.Item
            name="criterionId"
            label={t("fields.criterion")}
            rules={rules.criterionId}
            hidden={hiddenFields?.includes('criterionId')}
          >
            <CriterionSelect 
              placeholder={t("placeholders.select_criterion")}
            />
          </Form.Item>

          <Form.Item
            name="details"
            label={t("fields.response")}
            rules={rules.details}
            hidden={hiddenFields?.includes('details')}
          >
            <TextArea
              placeholder={t("placeholders.choice_description")}
              maxLength={400}
              allowClear
              showCount
            />
          </Form.Item>
 
          <Form.Item>
            <Form.Item 
              name="isEvidenceRequired" 
              valuePropName="checked" 
              hidden={hiddenFields?.includes('isEvidenceRequired')}
              noStyle
            >
              <Checkbox>{t("fields.isEvidenceRequired")}</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item
            noStyle
            preserve={false}
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.isEvidenceRequired !== currentValues.isEvidenceRequired
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("isEvidenceRequired") ? (
                <Form.List name="requiredEvidences">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space 
                          key={key} 
                          align="center" 
                          split={<Divider type="horizontal" />
                        }>
                          <Form.Item
                            {...restField}
                            name={[name, "contentType"]}
                            rules={evidenceRules.contentType}
                          >
                            <RecordSelect 
                              mode="multiple"
                              showSearch={false}
                              placeholder={t("placeholders.content_type")}
                              maxTagCount="responsive"
                              style={{ width: 150 }} 
                              records={contentTypeLabels} 
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            style={{ width: '100%' }}
                            name={[name, "title"]}
                            rules={evidenceRules.title}
                          >
                            <Input placeholder={t("placeholders.title")} />
                          </Form.Item>

                          <MinusCircleOutlined 
                            style={{ display: 'block', marginBottom: '24px' }}
                            onClick={() => onRemoveEvidence(name, remove)} 
                          />
                        </Space>
                      ))}

                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                          block
                        >
                          {t("buttons.add_evidence")}
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              ) : null
            }
          </Form.Item>
        </Form>
      )}
    </AppDrawer>
  );
}

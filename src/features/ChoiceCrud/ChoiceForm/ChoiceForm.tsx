import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { ChoiceFormSchema, rules } from "./ChoiceFormSchema";
import { useChoiceForm } from "./useChoiceForm";
import { TextArea } from "library/components/TextArea";
import { CriterionSelect } from "../CriterionSelect";
import { LevelSelect } from "../LevelSelect";

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface ChoiceFormProps {
  show: boolean;
  isLoading: boolean;
  defaults?: ChoiceFormSchema;
  isEdit?: boolean;
  onSave: (values: ChoiceFormSchema) => Promise<void>;
  onHide: () => void;
}

const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
];

const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
};

type SightsKeys = keyof typeof sights;

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
      console.log(values);
      onSave(values).then(onHide);
    });
  };

  const handleChange = () => {
    // form.setFieldsValue({ sights: [] });
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










          <Form.Item>
            <Form.Item name="addEvidences" valuePropName="checked" noStyle>
              <Checkbox>Esta respuesta require justificacion?</Checkbox>
            </Form.Item>
          </Form.Item>

        <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.addEvidences !== currentValues.addEvidences}
      >
        {({ getFieldValue }) =>
          getFieldValue('addEvidences') ? (
            <Form.List name="evidences">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  {...field}
                  label="Tipo"
                  name={[field.name, 'type']}
                  rules={[{ required: true, message: 'Missing sight' }]}
                >
                  <Select style={{ width: 130 }}>
                    <Select.Option key="1" value="image">
                      Imagen
                    </Select.Option>
                    <Select.Option key="2" value="sheets">
                      Hoja de calculo
                    </Select.Option>
                    <Select.Option key="1" value="word">
                      Documento de Word
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Titulo"
                  name={[field.name, 'title']}
                  rules={[{ required: true, message: 'Missing price' }]}
                >
                  <Input />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add sights
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

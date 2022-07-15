import React from "react";
import { useTranslation } from "react-i18next";
import { AlignRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Tag } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { CriterionFormSchema, rules } from "./CriterionFormSchema";
import { useCriterionForm } from "./useCriterionForm";

interface CriterionFormProps {
  show: boolean;
  isLoading: boolean;
  defaults?: CriterionFormSchema;
  isEdit?: boolean;
  onSave: (values: CriterionFormSchema) => Promise<void>;
  onHide: () => void;
}

export default function CriterionForm(props: CriterionFormProps) {
  const { form, selectOptions, resetForm } = useCriterionForm();
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
            name="description"
            label={t("fields.criterion")}
            rules={rules.name}
          >
            <Input
              suffix={<AlignRightOutlined />}
              type="text"
              placeholder={t("placeholders.criterion")}
            />
          </Form.Item>


          <Form.Item
            name="lineaments"
            label={t("fields.lineaments")}
            rules={rules.lineaments}
          > 
            <Select
              style={{ width: '100%' }}
              mode="multiple"
              placeholder={t("placeholders.select_lineaments")}
              optionFilterProp="children"
              maxTagCount="responsive"
              // tagRender={(props) => <Tag closable={props.closable}>{props.label}</Tag>}
              
            >
              {selectOptions.map((group) => (
                <Select.OptGroup 
                  key={group.id} 
                  label={`${t("preffixes.domain")} ${group.name}`}
                >
                  {group.options.map(option => (
                    <Select.Option 
                      key={option.id} 
                      value={option.id}
                    >
                      {option.nomenclature}
                    </Select.Option>
                    ))}
                </Select.OptGroup>
                
              ))}
            </Select>
          </Form.Item>
        </Form>
      )}
    </AppDrawer>
  );
}

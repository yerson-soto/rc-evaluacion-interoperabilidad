import React from "react";
import { useTranslation } from "react-i18next";
import { AlignRightOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { AppDrawer } from "library/components/AppDrawer";
import { LineamentFormSchema, rules } from "./LineamentFormSchema";
import { useLineamentForm } from "./useLineamentForm";

interface LineamentFormProps {
  show: boolean;
  isLoading: boolean;
  defaults?: LineamentFormSchema;
  isEdit?: boolean;
  onSave: (values: LineamentFormSchema) => Promise<void>;
  onHide: () => void;
}

export default function LineamentForm(props: LineamentFormProps) {
  const { form, suffix, domains, resetForm, changeSuffix } = useLineamentForm();
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
              // onChange={changeSuffix}
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

          {/* <Form.Item
            name="nomenclature"
            label={t("fields.nomenclature")}
            rules={rules.nomenclature}
          >
            <Input
              suffix={<QrcodeOutlined />}
              placeholder={t("placeholders.nomenclature")}
              addonBefore={suffix}
            />
          </Form.Item> */}

          <Form.Item
            name="description"
            label={t("fields.description")}
            rules={rules.description}
          >
            <Input
              suffix={<AlignRightOutlined />}
              type="text"
              placeholder={t("placeholders.description")}
            />
          </Form.Item>
        </Form>
      )}
    </AppDrawer>
  );
}

import React from "react";
import { Form } from "antd";
import { DomainFormSchema } from "./DomainFormSchema";
import { Domain } from "library/models/Domain";
import createSlug from "library/helpers/create-slug";

export function useDomainForm() {
  const [form] = Form.useForm<DomainFormSchema>();

  const namePreview = Form.useWatch('name', form);
  const colorPreview = Form.useWatch('color', form);

  const resetForm = () => {
    form.resetFields();
  };

  const populateSlug = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const slug = createSlug(value),
      acronym = normalizeAcronym(value.substring(0, 2));

    form.setFieldsValue({ slug });
    form.setFieldsValue({ acronym });
  };

  const normalizeAcronym = (acronym: string) => {
    return acronym
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  };

  const normalizeSlug = (slug: string) => {
    return slug.replaceAll(" ", "-").toLowerCase();
  };

  return {
    form,
    namePreview,
    colorPreview,
    resetForm,
    populateSlug,
    normalizeAcronym,
    normalizeSlug,
  };
}

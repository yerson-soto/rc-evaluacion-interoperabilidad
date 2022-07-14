import React from "react";
import { Form } from "antd";
import { LineamentFormSchema } from "./LineamentFormSchema";
import { useAppSelector } from 'main/store';

const baseSuffix = 'LI.I15D.';

export function useLineamentForm() {
  const [form] = Form.useForm<LineamentFormSchema>();
  const [suffix, setSuffix] = React.useState(baseSuffix + 'XX');

  const domains = useAppSelector(state => state.domains.results);

  const changeSuffix = (value: string) => {
    const domain = domains.find(domain => domain.id === Number(value));
    if (domain) setSuffix(`${baseSuffix}${domain.acronym}.`);
  }

  const resetForm = (): void => {
    form.resetFields();
    setSuffix(baseSuffix + 'XX');
  };

  return { form, domains, suffix, resetForm, changeSuffix };
}

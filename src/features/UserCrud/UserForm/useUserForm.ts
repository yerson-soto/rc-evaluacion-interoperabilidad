import { useState } from "react";
import { Form } from "antd";
import { UserFormSchema } from "./UserFormSchema";
import { useInstitutionOptions } from 'library/components/InstitutionSelect/useInstitutionOptions';

// Refactor useInstitutionOptions
export function useUserForm() {
  const [form] = Form.useForm<UserFormSchema>();
  const [emailDomain, setEmailDomain] = useState("");
  const { institutionOptions } = useInstitutionOptions();

  const domainNotFound = Boolean(Form.useWatch("organizationId", form) && !emailDomain);
  
  const changeEmailDomain = (orgId: number): void => {
    const currentOrg = institutionOptions.find((org) => org.value === orgId);

    if (currentOrg?.emailDomain) {
      setEmailDomain(currentOrg.emailDomain);
    } else {
      setEmailDomain("");
    }
  };

  const resetForm = (): void => {
    form.resetFields();
  };

  return {
    form,
    institutionOptions,
    domainNotFound,
    emailDomain,
    changeEmailDomain,
    resetForm,
  };
}

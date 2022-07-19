import { useState } from "react";
import { Form } from "antd";
import { UserFormSchema } from "./UserFormSchema";
import { useOrganizationList } from "../../EvaluationList/AddEvaluation/useOrganizacionList";

export function useUserForm() {
  const [form] = Form.useForm<UserFormSchema>();
  const [emailDomain, setEmailDomain] = useState("");

  const domainNotFound = Boolean(Form.useWatch("organizationId", form) && !emailDomain);

  const { organizations } = useOrganizationList();

  const changeDomain = (orgId: number): void => {
    const currentOrg = organizations.find((org) => org.id === orgId);

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
    organizations,
    domainNotFound,
    emailDomain,
    changeDomain,
    resetForm,
  };
}

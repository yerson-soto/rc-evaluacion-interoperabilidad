import { useState } from "react";
import { Form } from "antd";
import { UserFormSchema } from "./UserFormSchema";
import { Organization } from "library/models/Organization";
import { useUserIdentity } from "./useUserIdentity";

export function useUserForm() {
  const [form] = Form.useForm<UserFormSchema>();
  const [emailDomain, setEmailDomain] = useState("");
  const {
    isVerifying,
    isInvalid,
    identity,
    verifyIdentity,
    cancelVerification,
  } = useUserIdentity();

  const domainNotFound = Boolean(
    Form.useWatch("organizationId", form) && !emailDomain
  );

  const changeEmailDomain = (
    institutionId: number,
    institutions: Organization[]
  ) => {
    const currentOrg = institutions.find((org) => org.id === institutionId);

    if (currentOrg?.emailDomain) {
      setEmailDomain(currentOrg.emailDomain);
    } else {
      setEmailDomain("");
    }
  };

  const resetForm = (): void => {
    setEmailDomain("");
    cancelVerification()
    form.resetFields();
  };
  
  const onIdentityChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const identification = event.target.value
      .replaceAll("-", "")
      .replaceAll("_", "");
    
    if (identification.length === 11) {
      verifyIdentity(identification);
    } else {
      cancelVerification();
    }
  };

  return {
    form,
    onIdentityChange,
    identity,
    isVerifying,
    isInvalid,
    domainNotFound,
    emailDomain,
    changeEmailDomain,
    resetForm,
  };
}

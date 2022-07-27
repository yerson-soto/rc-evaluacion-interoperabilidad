import React from "react";
import { Alert, Space } from "antd";
import { useTranslation } from "react-i18next";
import { TimeoutButton } from "library/components/TimeoutButton";

interface ConfirmationInvalidProps {
  onResendMail: () => Promise<void>;
  forwarding?: boolean;
}

export default function ConfirmInvalid(props: ConfirmationInvalidProps) {
  const { onResendMail, forwarding} = props;
  const { t } = useTranslation();

  return (
    <Space direction="vertical" size="large">
      <Alert
        type="error"
        message={t("alerts.confirm_email_failed")}
        description={t("texts.confirm_email_failed")}
        showIcon
      />
      <TimeoutButton
        loading={forwarding}
        onClick={onResendMail}
        type="primary"
        size="large"
        timeout={60000}
        attemps={2}
        block
      >
        {t("buttons.resend_mail")}
      </TimeoutButton>
    </Space>
  );
}

import { getText } from "i18n";
import { Rule } from "antd/lib/form";

export interface UserFormSchema {
  identification: string;
  email: string;
  type: number;
  organizationId: number;
}

export const rules: Record<keyof UserFormSchema, Rule[]> = {
  identification: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.identification"),
      }),
    }
  ],
  email: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.email")
      })
    },
    {
      pattern: /^[a-z0-9_\.]+$/,
      message: getText("rules.invalid_username")
    }
  ],
  type: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.user_type")
      })
    }
  ],
  organizationId: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.organization")
      })
    }
  ]
}

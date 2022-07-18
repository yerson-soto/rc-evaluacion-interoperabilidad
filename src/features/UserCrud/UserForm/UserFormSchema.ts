import { getText } from "i18n";
import { Rule } from "antd/lib/form";

export interface UserFormSchema {
  firstName: string;
  lastName: string;
  email: string;
  type: number;
  organizationId: number;
}

export const rules: Record<keyof UserFormSchema, Rule[]> = {
  firstName: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.first_name"),
      }),
    },
  ],
  lastName: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.last_name")
      })
    }
  ],
  email: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.email")
      })
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

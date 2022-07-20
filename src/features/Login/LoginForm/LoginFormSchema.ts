import { FormRules } from "library/common/types";
import { getText } from 'i18n';

export interface LoginFormSchema {
  username: string;
  password: string;
  remember: boolean;
}

export const rules: FormRules<LoginFormSchema> = {
  username: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.email"),
      }),
    },
  ],
  password: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.password")
      })
    }
  ],
  remember: []
}
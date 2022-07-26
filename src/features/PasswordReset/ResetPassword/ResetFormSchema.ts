import { FormRules } from "library/common/types";
import { getText } from 'i18n';

export interface ResetFormSchema {
  password: string;
  confirmPassword: string;
}

export const rules: FormRules<ResetFormSchema> = {
  password: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.password")
      })
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.confirm_password")
      })
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(getText("rules.password_match")));
      },
    }),
  ]
}
import { getText } from "i18n";
import { FormRules } from "library/common/types";

export interface ChangePasswordFormSchema {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export const rules: FormRules<ChangePasswordFormSchema> = {
  password: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.password")
      })
    },
  ],
  newPassword: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.new_password")
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
        if (!value || getFieldValue('newPassword') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(getText("rules.password_match")));
      },
    }),
  ]
}
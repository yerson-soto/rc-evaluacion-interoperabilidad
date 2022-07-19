import { FormRules } from "library/common/types";

export interface LoginFormSchema {
  username: string;
  password: string;
  remember: boolean;
}

export const rules: FormRules<LoginFormSchema> = {
  username: [
    {
      required: true,
      // message: getText("rules.required", {
      //   field: getText("fields.domain"),
      // }),
    },
  ],
  password: [
    {
      required: true,
      // message: getText("rules.required", {
      //   field: getText("fields.description")
      // })
    }
  ],
  remember: []
}
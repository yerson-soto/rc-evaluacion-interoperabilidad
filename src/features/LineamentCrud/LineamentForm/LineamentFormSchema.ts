import { getText } from "i18n";
import { Rule } from "antd/lib/form";

export interface LineamentFormSchema {
  domainId: number;
  description: string;
}


export const rules: Record<keyof LineamentFormSchema, Rule[]> = {
  domainId: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.domain"),
      }),
    },
  ],
  description: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.description")
      })
    }
  ]
}

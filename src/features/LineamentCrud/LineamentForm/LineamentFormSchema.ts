import { getText } from "i18n";
import { Rule } from "antd/lib/form";

export interface LineamentFormSchema {
  domainId: number;
  nomenclature: string;
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
  nomenclature: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.domain"),
      }),
    },
    // {
    //   max: 5,
    //   message: getText("rules.max", {
    //     field: getText("fields.nomenclature"),
    //     length: 3
    //   })
    // }
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

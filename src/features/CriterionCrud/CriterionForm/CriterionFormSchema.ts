import { getText } from "i18n";
import { Rule } from "antd/lib/form";

export interface CriterionFormSchema {
  name: string;
  lineaments: number[];
}

export const rules: Record<keyof CriterionFormSchema, Rule[]> = {
  name: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.criterion"),
      }),
    },
  ],
  lineaments: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.select_lineaments")
      })
    }
  ]
}

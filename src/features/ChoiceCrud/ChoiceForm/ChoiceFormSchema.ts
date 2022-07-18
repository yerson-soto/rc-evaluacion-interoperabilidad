import { getText } from "i18n";
import { Rule } from "antd/lib/form";

export interface ChoiceFormSchema {
  levelId: number;
  criterionId: number;
  details: string;
}

export const rules: Record<keyof ChoiceFormSchema, Rule[]> = {
  levelId: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.level"),
      }),
    },
  ],
  criterionId: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.criterion"),
      }),
    },
  ],
  details: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.response")
      })
    }
  ]
}

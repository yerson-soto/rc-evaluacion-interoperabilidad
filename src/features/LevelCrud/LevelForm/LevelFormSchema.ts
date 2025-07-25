import { getText } from "i18n";
import { Rule } from "antd/lib/form";

export interface LevelFormSchema {
  name: string;
  description: string;
}

export const rules: Record<keyof LevelFormSchema, Rule[]> = {
  name: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.name"),
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

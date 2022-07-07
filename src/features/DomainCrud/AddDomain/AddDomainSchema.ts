import { getText } from "i18n";
import { Rule } from "antd/lib/form";

export interface AddDomainSchema {
  name: string;
  slug: string;
}

export const rules: Record<keyof AddDomainSchema, Rule[]> = {
  name: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.domain"),
      }),
    },
  ],
  slug: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.slug")
      })
    }
  ]
}

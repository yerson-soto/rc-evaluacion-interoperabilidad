import { getText } from "i18n";
import { Rule } from "antd/lib/form";

export interface DomainFormSchema {
  name: string;
  slug: string;
  acronym: string;
}

export const rules: Record<keyof DomainFormSchema, Rule[]> = {
  name: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.domain"),
      }),
    },
    {
      min: 3,
      message: getText("rules.min_length", {
        field: getText("fields.domain"),
        length: 3
      })
    }
  ],
  slug: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.slug")
      })
    }
  ],
  acronym: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.domain_acronym")
      })
    },
    {
      len: 2,
      message: getText("rules.length", {
        field: getText("fields.domain_acronym"),
        length: 2
      })
    },
    {
      transform: (value: string) => value.toUpperCase()
    }
  ],
}

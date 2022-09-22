import { getText } from "i18n";
import { Rule } from "antd/lib/form";

export interface EvaluationFormSchema {
  organizationId: number;
  startDate: string;
  userId: string;
  supportId: string;
}

export const rules: Record<keyof EvaluationFormSchema, Rule[]> = {
  organizationId: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.organization"),
      }),
    },
  ],
  startDate: [],
  userId: [],
  supportId: [],
}

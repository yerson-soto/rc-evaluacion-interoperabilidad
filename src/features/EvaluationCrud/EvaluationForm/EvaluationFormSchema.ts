import { getText } from "i18n";
import { Rule } from "antd/lib/form";

export interface EvaluationFormSchema {
  organizationId: number;
  startDate: string;
  endDate: string;
  userId: string;
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
  startDate: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.start_date")
      })
    }
  ],
  endDate: [
    {
      required: true,
      message: getText("rules.required", {
        field: getText("fields.end_date")
      })
    },
  ],
  userId: []
}

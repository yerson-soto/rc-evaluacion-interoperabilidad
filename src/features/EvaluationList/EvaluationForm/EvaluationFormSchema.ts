import { getText } from "i18n";
import { Rule } from "antd/lib/form";

export interface EvaluationFormSchema {
  userId?: string;
  supportId?: string;
  startDate?: moment.Moment | null;
  organizationId?: number | string;
  isScheduled?: boolean;
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
  isScheduled: [],
  startDate: [],
  userId: [],
  supportId: [],
}

import { getText } from "i18n";
import { Rule } from "antd/lib/form";

interface EvidenceFormSchema {
  contentType: string[];
  title: string;
}

export interface ChoiceFormSchema {
  levelId: number;
  criterionId: number;
  details: string;
  isEvidenceRequired: boolean;
  requiredEvidences: EvidenceFormSchema[];
}

export const evidenceRules: Record<keyof EvidenceFormSchema, Rule[]> = {
  contentType: [{
    required: true,
    message: "",
  }],
  title: [{
    required: true,
    message: "",
  }],
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
  ],
  isEvidenceRequired: [],
  requiredEvidences: []
}

import { GetChoice } from "./choice-dto";
import { GetLineament } from "./lineament-dto";

export interface CreateCriterion {
  description: string;
  lineaments: number[];
}

export interface GetCriterion {
  id: number;
  description: string;
  lineaments: GetLineament[];
  responses: GetChoice[];
}

export interface ChangeLevel {
  evaluationInstitutionalId: string;
  criterionId: number;
  responsesId: number;
}


export interface GetCriterion {
  id: number;
  description: string;
  lineaments: GetLineament[];
  responses: GetChoice[];
}

export interface GetLineament {
  id: number;
  description: string;
  definictionLineament: string;
  criterionResponses: null;
}

export interface GetChoice {
  responsesId: number;
  responseDecription: string;
  levelsResponse: {
    levelsId: number;
    level: string;
    description: string;
    levelDescription: string;
    levelValue: number;
  };
}

export interface ChangeLevel {
  evaluationInstitutionalId: string;
  criterionId: number;
  responsesId: number;
}

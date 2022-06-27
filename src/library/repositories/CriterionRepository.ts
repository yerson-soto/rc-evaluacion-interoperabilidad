import { Criterion } from 'library/models/Criterion';

export interface GetCriterion {
  id:          number;
  description: string;
  lineaments:  GetLineament[];
}

export interface GetLineament {
  id:                   number;
  description:          string;
  definictionLineament: string;
  criterionResponses:   null;
}


export interface CriterionRepository {
  getByDomain: (domainId: number) => Promise<Criterion[]>;
  mapResult: (result: GetCriterion) => Criterion;
}
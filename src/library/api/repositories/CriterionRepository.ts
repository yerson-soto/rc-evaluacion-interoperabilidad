import { Choice } from "library/models/Choice";
import { Criterion } from "library/models/Criterion";
import { ChangeLevel, GetCriterion } from "library/api/dto/criterion-dto";


export interface CriterionRepository {
  getByDomain: (domainId: number) => Promise<Criterion[]>;
  changeLevel: (data: ChangeLevel) => Promise<Choice>;
  mapResult: (result: GetCriterion) => Criterion;
}

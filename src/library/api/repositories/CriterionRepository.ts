import { Choice } from "library/models/Choice";
import { FullCriterion } from "library/models/Criterion";
import { ChangeLevel, GetCriterion } from "library/api/dto/criterion-dto";


export interface CriterionRepository {
  getByDomain: (domainId: number) => Promise<FullCriterion[]>;
  changeLevel: (data: ChangeLevel) => Promise<Choice>;
  mapResult: (result: GetCriterion) => FullCriterion;
}

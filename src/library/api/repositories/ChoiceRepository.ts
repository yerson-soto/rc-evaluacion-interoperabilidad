import { Choice } from 'library/models/Choice';
import { GetChoice } from 'library/api/dto/choice-dto';

export interface ChoiceRepository {
  getByCriterion: (criterionId: number) => Promise<Choice[]>;
  mapResult: (result: GetChoice, color: string) => Choice;
}
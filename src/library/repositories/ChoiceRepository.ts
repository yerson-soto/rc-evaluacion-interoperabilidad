import { Choice } from 'library/models/Choice';

export interface GetChoice {
  responsesId:        number;
  responseDecription: string;
  criterion:          null;
  levels:             Levels;
}

export interface Levels {
  levelsId:         number;
  level:            string;
  description:      string;
  levelDescription: string;
  levelValue:       number;
  responsesId:      number;
  responses:        null;
}


export interface ChoiceRepository {
  getByCriterion: (criterionId: number) => Promise<Choice[]>;
  mapResult: (result: GetChoice, color: string) => Choice;
}
export interface CreateChoice {
  levelId: number;
  description: string;
}

// export interface GetChoice {
//   responsesId:        number;
//   responseDecription: string;
//   criterion:          null;
//   levels:             Levels;
// }

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

// export interface Levels {
//   levelsId:         number;
//   level:            string;
//   description:      string;
//   levelDescription: string;
//   levelValue:       number;
//   responsesId:      number;
//   responses:        null;
// }
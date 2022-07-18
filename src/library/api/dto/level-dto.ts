export interface CreateLevel {
  description: string;
  levelDescription: string;
  levelValue: number;
}

export interface GetLevel {
  levelsId: number;
  level: string;
  description: string;
  levelDescription: string;
  levelValue: number;
}
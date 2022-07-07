import { Domain } from "library/models/Domain";
import { CommonRepository } from './CommonRepository';

export interface GetDomain {
  id: number;
  description: string;
}

export interface DomainRepository extends CommonRepository<Domain> {
  mapResult: (result: GetDomain) => Domain;
}

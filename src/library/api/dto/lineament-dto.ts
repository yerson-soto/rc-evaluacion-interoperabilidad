import { GetDomain } from 'library/api/dto/domain-dto';

export interface GetLineament {
  id: number;
  description: string;
  definictionLineament: string;
  domain: GetDomain;
}

export interface CreateLineament {
  domainId: number;
  description: string;
  definictionLineament: string;
}

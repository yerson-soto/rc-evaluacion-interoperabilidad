import { GetDomain } from 'library/api/dto/domain-dto';

export interface GetLineament {
  id: number;
  description: string;
  definictionLineament: string;
  domainResponse: GetDomain;
}

export interface CreateLineament {
  domainId: number;
  definictionLineament: string;
}

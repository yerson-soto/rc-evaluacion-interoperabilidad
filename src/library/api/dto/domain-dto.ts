export interface GetDomain {
  id: number;
  description: string;
  color: string;
  acronym: string;
  slug: string;
}

export interface CreateDomain {
  description: string;
  slug: string;
  acronym: string;
  color: string;
}

import { Domain } from "library/models/Domain";
import { GetDomain, CreateDomain } from "library/api/dto/domain-dto";
import { AbstractCrudService } from "./AbstractCrudService";
import { DomainMapper } from "library/api/mappers/DomainMapper";
import { DomainFormSchema } from "features/DomainCrud/DomainForm/DomainFormSchema";

export class DomainService extends AbstractCrudService<
  Domain,
  GetDomain,
  CreateDomain,
  DomainFormSchema
> {
  mapper: DomainMapper;
  getAllUrl: string;
  createUrl: string;

  constructor() {
    super();
    this.mapper = new DomainMapper();
    this.getAllUrl = "/domains";
    this.createUrl = "/domains";
  }
  
  getDetailUrl(id: number): string {
    return "/domains/" + id.toString();
  };
  
}

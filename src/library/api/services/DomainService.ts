import { Domain } from "library/models/Domain";
import { GetDomain, CreateDomain } from "library/api/dto/domain-dto";
import { AbstractCrudService } from "./AbstractCrudService";
import { DomainMapper } from "library/api/mappers/DomainMapper";
import { AddDomainSchema } from "features/DomainCrud/AddDomain/AddDomainSchema";

export class DomainService extends AbstractCrudService<
  Domain,
  GetDomain,
  CreateDomain,
  AddDomainSchema
> {
  mapper: DomainMapper;
  getAllUrl: string;
  getByIdUrl: string;
  createUrl: string;
  editUrl: string;
  deleteUrl: string;

  constructor() {
    super();
    this.mapper = new DomainMapper();
    this.getAllUrl = "/domains";
    this.getByIdUrl = "/domains";
    this.createUrl = "/domains";
    this.editUrl = "";
    this.deleteUrl = "";
  }
}

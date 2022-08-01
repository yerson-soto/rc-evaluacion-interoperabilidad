import { Organization } from "library/models/Organization";
import { GetOrganization } from "library/api/dto/organization-dto";
import { AbstractListService } from "./AbstractListService";
import { OrganizationMapper } from "../mappers/OrganizationMapper";

export class OrganizationService extends AbstractListService<
  Organization,
  GetOrganization
> {
  mapper: OrganizationMapper;
  getAllUrl: string;

  constructor() {
    super();
    this.mapper = new OrganizationMapper();
    this.getAllUrl = "/institutions";
  }
}

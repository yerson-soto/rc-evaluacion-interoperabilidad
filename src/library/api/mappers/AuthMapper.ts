import { AuthUser } from 'library/models/User';
import { GetAuthUser } from '../dto/auth-dto';
import { UserType } from "library/common/enums";
import { OrganizationMapper } from './OrganizationMapper';


export class AuthMapper {
  userFromAPI(data: GetAuthUser): AuthUser {
    const organizationMapper = new OrganizationMapper();
    
    return {
      uid: data.id,
      identification: data.document,
      firstName: data.firtName,
      lastName: data.lastName,
      email: data.email,
      type: 0,
      organizationId: data.organismo.id,
      organization: organizationMapper.fromAPINested(data.organismo)
    };
  }
}

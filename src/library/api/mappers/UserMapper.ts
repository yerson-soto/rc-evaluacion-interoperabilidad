import { Mapper } from "library/common/interfaces";
import { User } from "library/models/User";
import { UserFormSchema } from "features/UserCrud/UserForm/UserFormSchema";
import { GetUser, CreateUser, GetUserIdentity } from '../dto/user-dto';
import { UserIdentity } from 'library/models/User';
import { keys, paths } from "library/common/constants";
import { OrganizationMapper } from './OrganizationMapper';

export class UserMapper
  implements
    Mapper<User, GetUser, CreateUser, UserFormSchema>
{
  formSchemaToAPI(schema: UserFormSchema): CreateUser {
    const loginUrl = process.env.REACT_APP_BASE_URL +
      paths.auth.confirmEmail.reverse() +
      `?${keys.linkTokenParam}=`
    ;
    
    return {
      document: schema.identification,
      email: schema.email,
      userType: schema.type,
      organismoId: schema.organizationId,
      urlBase: loginUrl,
    };
  }

  fromAPI(data: GetUser): User {
    const orgMapper = new OrganizationMapper();
    
    return {
      uid: data.id,
      identification: data.document,
      firstName: data.firtName,
      lastName: data.lastName,
      fullName: data.fullName,
      email: data.email,
      type: data.userType,
      organization: orgMapper.fromAPINested(data.organismo)
    };
  }

  toIdentity(data: GetUserIdentity): UserIdentity {
    return {
      card: data.document,
      firstName: data.firtName,
      lastName: data.lastName,
      fullName: data.fullName
    };
  }
}

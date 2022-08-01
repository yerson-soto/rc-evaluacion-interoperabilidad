import { AbstractAPIService } from "./AbstractApiService";
import { APIResponse, Mapper } from "library/common/interfaces";
import { getText } from "i18n";

export interface CreateRepository<T, FormSchema> {
  create: (formSchema: FormSchema) => Promise<T>;
}

export abstract class AbstractCreateService<T, DataReceived, DataSent, FormSchema>
  extends AbstractAPIService
  implements CreateRepository<T, FormSchema>
{
  protected abstract mapper: Mapper<T, DataReceived, DataSent, FormSchema>;
  protected abstract createUrl: string;

  create(schema: FormSchema): Promise<T> {
    return new Promise((resolve, reject) => {
      const data = this.mapper.formSchemaToAPI(schema);
      
      this.client
        .post<APIResponse<DataReceived>>(this.createUrl, data)
        .then((res) => {
          const result = this.mapper.fromAPI(res.data.result);
          resolve(result);
        })
        .catch((err) => {
          const errorMessage = getText(err.response.data.message);
          reject(errorMessage);
        });
    });
  }
}

import { AbstractAPIService } from "./AbstractApiService";
import { APIResponse, Mapper } from "library/common/interfaces";
import { ID } from "library/common/types";
import { getText } from "i18n";

export interface EditRepository<T, FormSchema> {
  edit: (id: ID, formSchema: FormSchema) => Promise<T>;
}

export abstract class AbstractEditService<T, DataReceived, DataSent, FormSchema>
  extends AbstractAPIService
  implements EditRepository<T, FormSchema>
{
  protected abstract mapper: Mapper<T, DataReceived, DataSent, FormSchema>;
  protected abstract getAllUrl: string;
  protected abstract createUrl: string;

  protected abstract getDetailUrl(id: ID): string;

  edit(id: ID, schema: FormSchema): Promise<T> {
    return new Promise((resolve, reject) => {
      const data = this.mapper.formSchemaToAPI(schema);
      const url = this.getDetailUrl(id);

      this.client
        .put<APIResponse<DataReceived>>(url, data)
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

import { AbstractAPIService } from "./AbstractApiService";
import { APIResponse, Mapper } from "library/common/interfaces";
import { ID } from "library/common/types";

export interface DeleteRepository<T, FormSchema> {
  delete: (id: ID) => Promise<void>;
}

export abstract class AbstractDeleteService<T, DataReceived>
  extends AbstractAPIService
  implements DeleteRepository<T, any>
{
  protected abstract mapper: Mapper<T, DataReceived, any, any>;

  protected abstract getDetailUrl(id: ID): string;

  delete(id: ID): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = this.getDetailUrl(id);

      this.client
        .delete<APIResponse<null>>(url)
        .then(() => resolve())
        .catch(() => reject("No se pudo eliminar el registro"));
    });
  }
}

import { AbstractAPIService } from "./AbstractApiService";
import { APIResponse, Mapper } from "library/common/interfaces";
import { ID } from "library/common/types";


export interface RetrieveRepository<T> {
  getById: () => Promise<T>;
}

export abstract class AbstractRetrieveService<T, DataReceived>
  extends AbstractAPIService
  implements RetrieveRepository<T>
{
  protected abstract mapper: Mapper<T, DataReceived, any, any>;

  protected abstract getDetailUrl(id: ID): string;

  getById(): Promise<T> {
    return new Promise((resolve, reject) => {});
  }
}

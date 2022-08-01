import { AbstractAPIService } from "./AbstractApiService";
import { APIResponse, Mapper } from "library/common/interfaces";

export interface ListRepository<T> {
  getAll: () => Promise<T[]>;
}

export abstract class AbstractListService<T, DataReceived>
  extends AbstractAPIService
  implements ListRepository<T>
{
  protected abstract mapper: Mapper<T, DataReceived, any, any>;
  protected abstract getAllUrl: string;

  getAll(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.client
        .get<APIResponse<DataReceived[]>>(this.getAllUrl)
        .then((res) => {
          const mapper = this.mapper.fromAPI.bind(this.mapper);
          const results = res.data.result.map(mapper);
          resolve(results);
        })
        .catch(() => reject("No se pudo cargar los resultados"));
    });
  }
}

import { AbstractAPIService } from "./AbstractApiService";
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { APIResponse, Mapper } from "library/common/interfaces";

export abstract class AbstractCrudService<T, DataReceived, DataSent, FormSchema>
  extends AbstractAPIService
  implements CrudRepository<T, FormSchema>
{
  protected abstract mapper: Mapper<T, DataReceived, DataSent, FormSchema>;
  protected abstract getAllUrl: string;
  protected abstract getByIdUrl: string;
  protected abstract createUrl: string;
  protected abstract editUrl: string;
  protected abstract deleteUrl: string;
  
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

  getById(): Promise<T> {
    return new Promise((resolve, reject) => {});
  }

  create(schema: FormSchema): Promise<T> {
    return new Promise((resolve, reject) => {
      const data = this.mapper.formSchemaToAPI(schema);

      this.client
        .post<APIResponse<DataReceived>>(this.createUrl, data)
        .then((res) => {
          const result = this.mapper.fromAPI(res.data.result);
          resolve(result);
        })
        .catch(() => reject("No se pudo cargar los resultados"));
    });
  }

  edit(): Promise<T> {
    return new Promise((resolve, reject) => {});
  }

  delete(): Promise<void> {
    return new Promise((resolve, reject) => {});
  }
}

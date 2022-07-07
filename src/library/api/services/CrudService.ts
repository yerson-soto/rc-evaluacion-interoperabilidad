import { APIService } from './ApiService';
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { APIResponse } from 'library/common/interfaces';

export interface Mapper<T> {
  fromAPI: (data: any) => T;
  toAPI: (instance: T) => any;
}

export abstract class CrudService<T> extends APIService implements CrudRepository<T> {
  abstract mapper: Mapper<T>;
  
  getAll(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.client.get<APIResponse<T[]>>('/domains')
        .then(res => {
          const domains = res.data.result.map(this.mapResult.bind(this))
          resolve(domains);
        })
        .catch(() => reject('No se pudo cargar los dominios'))
    });
  }

  getById(): Promise<T> {
    
  }

  create(): Promise<T> {

  }

  edit(): Promise<T> {

  }

  delete(): Promise<void> {

  }
}

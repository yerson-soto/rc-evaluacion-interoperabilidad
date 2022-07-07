export interface CrudRepository<T> {
  getAll: () => Promise<T[]>;
  getById: () => Promise<T>;
  create: () => Promise<T>;
  edit: () => Promise<T>;
  delete: () => Promise<void>;
}
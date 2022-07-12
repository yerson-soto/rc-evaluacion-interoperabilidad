import { ID } from "library/common/types";

export interface CrudRepository<T, FormSchema> {
  getAll: () => Promise<T[]>;
  getById: () => Promise<T>;
  create: (formSchema: FormSchema) => Promise<T>;
  edit: (id: ID, formSchema: FormSchema) => Promise<T>;
  delete: (id: ID) => Promise<void>;
}
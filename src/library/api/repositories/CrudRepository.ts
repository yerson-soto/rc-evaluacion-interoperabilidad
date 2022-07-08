export interface CrudRepository<T, FormSchema> {
  getAll: () => Promise<T[]>;
  getById: () => Promise<T>;
  create: (formSchema: FormSchema) => Promise<T>;
  edit: (formSchema: FormSchema) => Promise<T>;
  delete: () => Promise<void>;
}
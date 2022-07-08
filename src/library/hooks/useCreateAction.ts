import { AbstractCrudService } from "../api/services/AbstractCrudService";

interface CreateAction<T, Post, Get, FormSchema> {
  service: new () => AbstractCrudService<T, Get, Post, FormSchema>;
}

export function useCreateAction<T, Get, Post, FormSchema>({
  service: Service,
}: CreateAction<T, Get, Post, FormSchema>) {
  const service = new Service();

  const create = (data: FormSchema): void => {

    
    // service.create(data)
    //   .then(result => )
  };

  return { create };
}

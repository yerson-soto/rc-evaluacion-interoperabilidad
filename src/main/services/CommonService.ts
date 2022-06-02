import { CommonRepository } from "library/repositories/CommonRepository";

export abstract class CommonService<T> implements CommonRepository<T> {
  abstract getAll: () => Promise<T[]>;
}

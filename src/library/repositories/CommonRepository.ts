export interface CommonRepository<T> {
  getAll: () => Promise<T[]>;
}
export interface ICrudService<T> {
  getAll(): Promise<T[]>;
  getOne(id: string): Promise<T>;
  update(id: string, entity: T): Promise<T>;
  create(entity: T): Promise<T>;
  delete(id: string): Promise<any>;
}

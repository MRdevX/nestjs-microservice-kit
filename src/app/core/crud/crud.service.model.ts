import { DeepPartial, DeleteResult, FindConditions, FindOneOptions, UpdateResult } from 'typeorm';
import { BaseEntitySearchDto } from '@root/app/common/base/base-search.dto';

export interface ICrudService<T> {
  search(options: BaseEntitySearchDto<T>): Promise<{ items: T[]; total: number }>;
  findOne(id: string | number | FindOneOptions<T> | FindConditions<T>, options?: FindOneOptions<T>): Promise<T>;
  findById(id: string, options?: FindOneOptions<T>): Promise<T>;
  update(id: string, entity: DeepPartial<T>): Promise<UpdateResult>;
  create<E extends DeepPartial<T>>(entity: E): Promise<T>;
  delete(id: string): Promise<DeleteResult>;
}

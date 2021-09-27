import { FindConditions, FindManyOptions, FindOneOptions } from 'typeorm';
import { BaseEntitySearchDto } from '@common/base/base-search.dto';
import { SearchConfig } from '@common/base/search.config.interface';

export interface ICrudService<T> {
  search(options: BaseEntitySearchDto<T>, config?: SearchConfig): Promise<{ items: T[]; total: number }>;
  findAll(filter?: FindManyOptions<T>): Promise<T[]>;
  findOne(id: string | number | FindOneOptions<T> | FindConditions<T>, options?: FindOneOptions<T>): Promise<T>;
  findById(id: string, options?: FindOneOptions<T>): Promise<T>;
  update(id: string, entity: T): Promise<T>;
  create(entity: T): Promise<T>;
  delete(id: string): Promise<any>;
}

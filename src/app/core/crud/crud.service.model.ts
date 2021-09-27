import { DeleteResult, FindConditions, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';
import { BaseEntitySearchDto } from '@common/base/base-search.dto';
import { SearchConfig } from '@root/app/common/interface/search.config.interface';

export interface ICrudService<T> {
  search(options: BaseEntitySearchDto<T>, config?: SearchConfig): Promise<{ items: T[]; total: number }>;
  findAll(filter?: FindManyOptions<T>): Promise<T[]>;
  findOne(id: string | number | FindOneOptions<T> | FindConditions<T>, options?: FindOneOptions<T>): Promise<T>;
  findById(id: string, options?: FindOneOptions<T>): Promise<T>;
  update(id: string, entity: T): Promise<UpdateResult>;
  create(entity: T, ...options: any[]): Promise<T>;
  delete(id: string): Promise<DeleteResult>;
}

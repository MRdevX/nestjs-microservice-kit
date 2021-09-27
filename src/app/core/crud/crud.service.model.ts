import { BaseEntitySearchDto } from '../../common/base/base-search.dto';
import { SearchConfig } from '../../common/base/search.config.interface';

export interface ICrudService<T> {
  search(options: BaseEntitySearchDto<T>, config?: SearchConfig): Promise<{ items: T[]; total: number }>;
  getAll(): Promise<T[]>;
  getOne(id: string): Promise<T>;
  update(id: string, entity: T): Promise<T>;
  create(entity: T): Promise<T>;
  delete(id: string): Promise<any>;
}

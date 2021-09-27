import { IFilterField } from '../interface/filter-field.interface';

export interface IBaseSearchDto<T> {
  [fieldName: string]: any;
  limit: number;
  offset: number;
  q?: string;
  query?: string;
  sortFields: string[];
  sortDirections: number[];
  readonly searchInput: string;
  readonly fullTextSearchInput: string;
  readonly selectFields: (keyof T)[];
  readonly searchFields: (keyof T)[];
  readonly filterFields: IFilterField<T>[];
}

export interface IBaseSearchDto<T> {
  [fieldName: string]: any;
  limit: number;
  offset: number;
  readonly selectFields: (keyof T)[];
}

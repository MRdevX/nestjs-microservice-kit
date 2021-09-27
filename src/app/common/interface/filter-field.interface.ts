import { QueryNarrowingOperators } from '@common/enum/query-operators.enum';

export interface IFilterField<T> {
  name: string;
  target?: keyof T;
  relationTarget?: string;
  operation: QueryNarrowingOperators;
}

import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { IRelation } from './relation.interface';
import { IBaseSearchDto } from './base-search.interface';

export abstract class BaseEntitySearchDto<T> implements IBaseSearchDto<T> {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => Number(value))
  limit = 10;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => Number(value))
  offset = 0;

  get selectFields(): (keyof T)[] {
    return [];
  }

  get relations(): string[] | IRelation<T>[] {
    return [];
  }
}

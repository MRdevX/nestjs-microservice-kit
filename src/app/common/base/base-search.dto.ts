import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min, IsString, IsArray } from 'class-validator';
import { toNumber } from 'lodash';
import { IBaseSearchDto } from './base-search.model';
import { IFilterField } from '../interface/filter-field.interface';
import { IRelation } from '../interface/relation.interface';

export abstract class BaseEntitySearchDto<T> implements IBaseSearchDto<T> {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform((value) => Number(value))
  limit = 10;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform((value) => Number(value))
  offset = 0;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  @Type(() => Array)
  @Transform((value: string) => value.split(','))
  sortFields: string[];

  @IsOptional()
  @IsInt({ each: true })
  @IsIn([-1, 1], { each: true })
  @Transform((value) => value.split(',').map(toNumber))
  @IsArray()
  sortDirections: number[];

  get searchInput() {
    return this.query || this.q;
  }

  get fullTextSearchInput() {
    if (this.query) return `%${this.query}%`;
    if (this.q) return `%${this.q}%`;
  }

  get selectFields(): (keyof T)[] {
    return [];
  }

  get searchFields(): (keyof T)[] {
    return [];
  }

  get filterFields(): IFilterField<T>[] {
    return [];
  }

  get relations(): string[] | IRelation<T>[] {
    return [];
  }
}

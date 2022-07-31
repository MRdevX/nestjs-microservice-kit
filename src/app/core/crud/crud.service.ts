import {
  Repository,
  BaseEntity,
  DeepPartial,
  DeleteResult,
  UpdateResult,
  FindOneOptions,
  SelectQueryBuilder,
} from 'typeorm';
import { ICrudService } from './crud.service.model';
import { BaseEntitySearchDto } from '@root/app/common/base/base-search.dto';
import { IRelation } from '@root/app/common/base/relation.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CrudService<T extends BaseEntity> implements ICrudService<T> {
  private readonly entityName = this.genericRepository.metadata.targetName;

  constructor(private readonly genericRepository: Repository<T>) {}

  public async search(options: BaseEntitySearchDto<T>) {
    const { limit, offset } = options;
    const alias = this.genericRepository.metadata.targetName;
    let qb = this.genericRepository.createQueryBuilder(alias);

    if (options.relations.length) {
      for (const relation of options.relations) {
        this.joinRelation(qb, alias, relation);
      }
    }

    if (options.selectFields.length) {
      qb = qb.select(options.selectFields.map((col) => `${alias}.${String(col)}`));
    }

    const [items = [], total = 0] = await qb['limit'](limit)['offset'](offset).getManyAndCount();
    return { items, total };
  }

  async getAll(): Promise<T[]> {
    return await this.genericRepository.find();
  }

  async create<E extends DeepPartial<T>>(entity: E): Promise<T> {
    return await this.genericRepository.create(entity).save();
  }

  // async update(id: string, entity: DeepPartial<T>): Promise<UpdateResult> {
  //   return await this.genericRepository.update(id, entity);
  // }

  async delete(id: string): Promise<DeleteResult> {
    return await this.genericRepository.delete(id);
  }

  public async findOne(options: FindOneOptions<T>): Promise<T> {
    const result = await this.genericRepository.findOne(options);
    if (!result) {
      return result;
    }
    return result;
  }

  private joinRelation(qb: SelectQueryBuilder<T>, parentEntity: string, relation: string | IRelation<T>) {
    const config: IRelation<T> = typeof relation === 'string' ? { name: relation, innerJoin: false } : relation;
    const propertyPath = config.name.includes('.') ? config.name : `${parentEntity}.${config.name}`;
    const relationAlias = config.name.includes('.') ? config.name.split('.').pop() : config.name;
    if (config.innerJoin) {
      qb = qb.innerJoinAndSelect(propertyPath, relationAlias);
    } else {
      qb = qb.leftJoinAndSelect(propertyPath, relationAlias);
    }
    return qb;
  }
}

import { Injectable } from '@nestjs/common';
import { Repository, BaseEntity, DeepPartial } from 'typeorm';

@Injectable()
export class BaseCrudService<T extends BaseEntity> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async getAll(): Promise<T[]> {
    return await this.genericRepository.find();
  }

  async getOne(id: number): Promise<T> {
    return await this.genericRepository.findOne(id);
  }

  async create<E extends DeepPartial<T>>(entity: E): Promise<T> {
    return await this.genericRepository.create(entity).save();
  }

  async create2(entity: DeepPartial<T>): Promise<T> {
    return await this.genericRepository.create(entity).save();
  }
}

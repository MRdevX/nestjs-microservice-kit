import { Injectable } from '@nestjs/common';
import { Repository, BaseEntity, DeepPartial } from 'typeorm';

@Injectable()
export class CrudService<T extends BaseEntity> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async getAll(): Promise<T[]> {
    return await this.genericRepository.find();
  }

  async getOne(id: string): Promise<T> {
    return await this.genericRepository.findOne(id);
  }

  async create<E extends DeepPartial<T>>(entity: E): Promise<T> {
    return await this.genericRepository.create(entity).save();
  }

  async create2(entity: DeepPartial<T>): Promise<T> {
    return await this.genericRepository.create(entity).save();
  }

  async update(id: string, entity: DeepPartial<T>): Promise<T> {
    await this.genericRepository.update(id, entity);
    return this.getOne(id);
  }

  async delete(id: string): Promise<any> {
    return await this.genericRepository.delete(id);
  }
}

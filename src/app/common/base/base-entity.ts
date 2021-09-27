import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IBaseEntity } from './base-entity.model';

export abstract class Base extends BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty()
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedDate?: Date;
}

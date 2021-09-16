import { Get, Post, Delete, Put, Body, Param, Patch } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BaseEntity } from 'typeorm';
import { ICrudService } from './crud.service.model';

export class CrudController<T extends BaseEntity> {
  constructor(private readonly crudService: ICrudService<T>) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<T[]> {
    return this.crudService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async findById(@Param('id') id: string): Promise<T> {
    return this.crudService.getOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() entity: T): Promise<T> {
    return this.crudService.create(entity);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async delete(@Param('id') id: string) {
    this.crudService.delete(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
  async update(@Param('id') id: string, @Body() entity: T): Promise<T> {
    return this.crudService.update(id, entity);
  }
}

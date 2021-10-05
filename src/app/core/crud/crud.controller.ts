import { Get, Post, Delete, Body, Param, Patch, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseEntitySearchDto } from '@root/app/common/base/base-search.dto';
import { ICrudService } from './crud.service.model';

export class CrudController<T> {
  constructor(private readonly crudService: ICrudService<T>) {}

  @ApiOperation({ summary: 'Search paginated' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found records' })
  @Get()
  async search(@Query() options?: BaseEntitySearchDto<T>): Promise<{ items: T[]; total: number }> {
    return this.crudService.search(options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a record by Id.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Entity does not exist' })
  async findById(@Param('id') id: string, @Query() query?: any): Promise<Partial<T>> {
    return this.crudService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a record.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async create(@Body() entity: T): Promise<T> {
    return this.crudService.create(entity);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing record.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Entity updated successfully.' })
  async update(@Param('id') id: string, @Body() entity: T): Promise<UpdateResult | T> {
    return this.crudService.update(id, entity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a record.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Entity deleted successfully.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.crudService.delete(id);
  }
}

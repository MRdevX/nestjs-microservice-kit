import { Get, Post, Delete, Body, Param, Patch, HttpStatus, Query, ParseArrayPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseEntity } from 'typeorm';
import { BaseEntitySearchDto } from '@common/base/base-search.dto';
import { ICrudService } from './crud.service.model';

export class CrudController<T extends BaseEntity> {
  constructor(private readonly crudService: ICrudService<T>) {}

  @ApiOperation({ summary: 'Search paginated' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found records' })
  @Get()
  async search(@Query() options?: BaseEntitySearchDto<T>, ...args: any[]): Promise<{ items: T[]; total: number }> {
    return this.crudService.search(options);
  }

  @ApiOperation({ summary: 'Find by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found one record' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Query('relations', new ParseArrayPipe({ optional: true })) relations?: string[],
    ...args: any[]
  ): Promise<T> {
    if (relations) {
      return this.crudService.findById(id, { relations });
    }
    return this.crudService.findById(id);
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

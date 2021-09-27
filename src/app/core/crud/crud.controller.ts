import { DeleteResult, UpdateResult } from 'typeorm';
import { Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, Query, ParseArrayPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseEntitySearchDto } from '@common/base/base-search.dto';
import { ICrudService } from './crud.service.model';

@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
@ApiBearerAuth()
export abstract class CrudController<T> {
  protected constructor(private readonly crudService: ICrudService<T>) {}

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

  @ApiOperation({ summary: 'Create a new record' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input, The response body may contain clues as to what went wrong',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() entity: T, ...args: any[]): Promise<T> {
    return this.crudService.create(entity);
  }

  @ApiOperation({ summary: 'Update an existing record' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully edited.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input, The response body may contain clues as to what went wrong',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Put(':id')
  async update(@Param('id') id: string, @Body() entity: T): Promise<UpdateResult> {
    return this.crudService.update(id, entity);
  }

  @ApiOperation({ summary: 'Delete a record' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The record has been successfully deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.crudService.delete(id);
  }
}

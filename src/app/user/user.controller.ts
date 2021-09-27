import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '@root/models/user/user.dto';
import { CrudController } from '../core/crud/crud.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController extends CrudController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Post()
  @ApiOperation({ summary: 'Create an User' })
  async create(@Body() userData: CreateUserDto) {
    const createdUser = await this.userService.create(userData);
    return createdUser;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an User' })
  async update(@Param('id') id: string, @Body() userData: UpdateUserDto): Promise<UpdateResult> {
    return this.userService.update(id, userData);
  }
}

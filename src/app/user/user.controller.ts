import { Controller } from '@nestjs/common';
import { CrudController } from '../core/crud/crud.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController extends CrudController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}

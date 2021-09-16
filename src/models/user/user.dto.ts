import { IsString } from 'class-validator';
import { IUser } from './user.model';

export class UserDto implements IUser {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  title: string;
}

import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { IUser } from './user.model';

export class UserDto implements IUser {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  @Exclude()
  password: string;

  @IsString()
  title: string;
}

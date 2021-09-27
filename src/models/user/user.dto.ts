import { IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { IUser } from './user.model';
import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';

export class UserDto implements IUser {
  id?: string;

  @ApiProperty({
    description: 'User First Name.',
    example: 'Ralph',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User Last Name.',
    example: 'Remington',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User Email Address.',
    example: 'ralphremington@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User Password',
  })
  @IsString()
  @Exclude()
  password: string;

  @ApiProperty({
    description: 'User Title.',
    example: 'Backend Engineer',
  })
  @IsString()
  title: string;
}

export class CreateUserDto extends PickType(UserDto, ['email', 'password'] as const) {}

export class UpdateUserDto extends PartialType(OmitType(UserDto, ['id', 'password', 'email'] as const)) {}

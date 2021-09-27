import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IUser } from './user.model';
import { ApiProperty, OmitType, PartialType, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto implements IUser {
  id?: string;

  @ApiPropertyOptional({
    description: 'User First Name.',
    example: 'Ralph',
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiPropertyOptional({
    description: 'User Last Name.',
    example: 'Remington',
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    description: 'User Email Address.',
    example: 'ralphremington@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User Password',
    example: '123456',
  })
  @IsString()
  password: string;

  @ApiPropertyOptional({
    description: 'User Title.',
    example: 'Backend Engineer',
  })
  @IsString()
  @IsOptional()
  title: string;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['id', 'password', 'email'] as const)) {}

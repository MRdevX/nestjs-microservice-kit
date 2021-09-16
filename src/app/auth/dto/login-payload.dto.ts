import { ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../../models/user/user.dto';
import { TokenPayloadDto } from './token-payload.dto';

export class LoginPayloadDto {
  @ApiProperty({ type: UserDto })
  @ValidateNested()
  user: UserDto;

  @ApiProperty()
  tokens: { access: TokenPayloadDto; refresh: TokenPayloadDto };

  constructor(user: UserDto, tokens: { access: TokenPayloadDto; refresh: TokenPayloadDto }) {
    this.user = user;
    this.tokens = tokens;
  }
}

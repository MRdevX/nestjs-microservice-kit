import { ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { TokenPayloadDto } from '../dto/token-payload.dto';
import { UserDto } from '../../../models/user/user.dto';

export class LoginResponse {
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

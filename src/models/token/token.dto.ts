import { IToken } from './token.model';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { TokenType } from './token-type.enum';
import { Token } from '@root/app/token/token.entity';
import { UserDto } from '@root/models/user/user.dto';

export class TokenDto implements IToken {
  @ApiPropertyOptional()
  token: string;

  @ApiPropertyOptional()
  user: UserDto;

  @ApiPropertyOptional()
  type: TokenType;

  @ApiPropertyOptional()
  expires: Date;

  @ApiPropertyOptional()
  blacklisted: boolean;

  constructor(token: Token) {
    this.token = token.token;
    this.user = token.user;
    this.type = token.type;
    this.expires = token.expires;
    this.blacklisted = token.blacklisted;
  }
}

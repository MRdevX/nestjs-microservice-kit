import { ApiProperty } from '@nestjs/swagger';

import { TokenPayloadDto } from './token-payload.dto';

export class AuthTokensPayloadDto {
  @ApiProperty()
  access: TokenPayloadDto;

  @ApiProperty()
  refresh: TokenPayloadDto;

  constructor(access: TokenPayloadDto, refresh: TokenPayloadDto) {
    this.access = access;
    this.refresh = refresh;
  }
}

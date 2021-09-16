import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  expires: Date;

  constructor(token: string, expires: Date) {
    this.token = token;
    this.expires = expires;
  }
}

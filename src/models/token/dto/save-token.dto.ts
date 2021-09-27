import { TokenType } from '../token-type.enum';

export class SaveTokenDto {
  user: string;

  expires: Date;

  type: TokenType;

  token: string;

  blacklisted: boolean;
}

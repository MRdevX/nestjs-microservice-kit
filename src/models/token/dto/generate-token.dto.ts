import { TokenType } from '../token-type.enum';

export class GenerateTokenDto {
  userId: string;

  email: string;

  expires: string;

  type: TokenType;

  secret: string;
}

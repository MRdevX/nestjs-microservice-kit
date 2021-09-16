import { TokenType } from "../../models/token/token-type.enum";

export interface JwtPayload {
  sub: string;
  email: string;
  type: TokenType;
}

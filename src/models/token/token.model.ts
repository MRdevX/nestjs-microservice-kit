import { IBaseEntity } from '@common/base/base-entity.model';
import { IUser } from '@root/models/user/user.model';
import { TokenType } from './token-type.enum';

export interface IToken extends IBaseEntity {
  token: string;

  type: TokenType;

  expires: Date;

  blacklisted: boolean;

  user: IUser;
}

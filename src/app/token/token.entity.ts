import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TokenDto } from '@root/models/token/token.dto';
import { TokenType } from '@root/models/token/token-type.enum';
import { IToken } from '@root/models/token/token.model';
import { Base } from '@root/app/common/base';
import { User } from '@root/app/user/user.entity';

@Entity({ name: 'tokens' })
export class Token extends Base implements IToken {
  @Column()
  token: string;

  @Column()
  type: TokenType;

  @Column()
  expires: Date;

  @Column()
  blacklisted: boolean;

  @Exclude()
  dtoClass = TokenDto;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}

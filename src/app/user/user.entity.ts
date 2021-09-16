import { Column, Entity } from 'typeorm';
import { IUser } from '@root/models/user/user.model';
import { Base } from '@common/base';

@Entity('users')
export class User extends Base implements IUser {
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  title: string;
}

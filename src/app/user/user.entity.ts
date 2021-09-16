import { Entity } from 'typeorm';
import { IUser } from '@root/models/user/user.model';
import { Base } from '@common/base';

@Entity('users')
export class User extends Base implements IUser {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
}

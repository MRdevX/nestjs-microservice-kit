import { Column, Entity } from 'typeorm';
import { IUser } from '@root/models/user/user.model';
import { Base } from '@common/base';

@Entity('users')
export class User extends Base implements IUser {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  title: string;
}

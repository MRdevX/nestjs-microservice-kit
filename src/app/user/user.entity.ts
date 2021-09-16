import { Entity } from 'typeorm';
import { IUser } from '@models/user/user.model';

@Entity('users')
export class User implements IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
}

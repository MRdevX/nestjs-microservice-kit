import { IBaseEntity } from '@common/base/base-entity.model';
export interface IUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
}

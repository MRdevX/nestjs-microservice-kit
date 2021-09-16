export interface IBaseEntity {
  id?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly deletedDate?: Date;
}

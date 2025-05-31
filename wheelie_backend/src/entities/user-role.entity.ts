import { WHEELIE_DB } from '@/common/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRoleType {
  TOURIST = 'tourist',
  OWNER = 'owner',
  ADMIN = 'admin',
}

@Entity({ database: WHEELIE_DB, name: 'UserRoles' })
export class UserRole {
  @PrimaryGeneratedColumn({
    name: 'Id',
  })
  _id: string;

  @Column({
    name: 'UserId',
    type: 'uuid',
    nullable: false,
  })
  userId: string;

  @Column({
    name: 'Role',
    type: 'nvarchar',
    length: 50,
    enum: UserRoleType,
    nullable: false,
  })
  authProvider: UserRoleType;

  @Column({ name: 'IsDeleted', default: false })
  isDeleted?: boolean;

  @Column({
    name: 'CreatedBy',
  })
  createdBy: string;

  @Column({
    name: 'UpdatedBy',
  })
  updatedBy: string;

  @Column({
    name: 'CreatedAt',
  })
  @CreateDateColumn({
    name: 'CreatedAt',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'UpdatedAt',
  })
  updatedAt: Date;
}

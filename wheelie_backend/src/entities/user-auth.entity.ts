import { WHEELIE_DB } from '@/common/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
  FACEBOOk = 'facebook',
}

// @Unique("U_UserId_AuthProvider", ["UserId", "AuthProvider"])
@Entity({ database: WHEELIE_DB, name: 'UserAuth' })
export class UserAuth {
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
    name: 'AuthProvider',
    type: 'varchar',
    length: 50,
    enum: AuthProvider,
    nullable: false,
  })
  authProvider: AuthProvider;

  @Column({
    name: 'AuthProviderId',
    type: 'varchar',
    length: 255,
  })
  authProviderId?: string;

  @Column({
    name: 'PasswordHash',
    type: 'varchar',
    length: 255,
  })
  passwordHash?: string;

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

  @CreateDateColumn({
    name: 'CreatedAt',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'UpdatedAt',
  })
  updatedAt: Date;
}

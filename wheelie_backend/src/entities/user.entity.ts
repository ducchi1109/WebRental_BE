import { WHEELIE_DB } from '@/common/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Unique('u_user_email', ['email'])
@Entity({ database: WHEELIE_DB, name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  _id: string;

  @Column({ name: 'full_name', type: 'varchar', length: 255, nullable: false })
  fullName: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ name: 'phone_number', type: 'varchar', length: 20 })
  phoneNumber?: string;

  @Column({
    name: 'profile_picture',
    type: 'varchar',
    length: 50,
  })
  profilePicture?: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted?: boolean;

  @Column({
    name: 'created_user',
  })
  createdUser: string;

  @Column({
    name: 'updated_user',
  })
  updatedUser: string;

  @CreateDateColumn({
    name: 'created_date',
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'updated_date',
  })
  updatedDate: Date;
}

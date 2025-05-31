import { WHEELIE_DB } from '@/common/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: WHEELIE_DB, name: 'vehicle_brand' })
export class VehicleBrand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'brand_name', type: 'varchar', length: 100, nullable: false })
  brandName: string;

  @Column({
    name: 'vehicle_type',
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  vehicleType: string;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ name: 'created_user', type: 'uuid', nullable: false })
  createdUser: string;

  @Column({ name: 'created_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ name: 'updated_user', type: 'uuid', nullable: true })
  updatedUser?: string;

  @Column({ name: 'updated_date', type: 'timestamp', nullable: true })
  updatedDate?: Date;
}
import { WHEELIE_DB } from '@/common/constants';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VehicleBrand } from './vehiclebrand.entity';

@Entity({ database: WHEELIE_DB, name: 'vehicle_model' })
export class VehicleModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'model_name', type: 'varchar', length: 100, nullable: false })
  modelName: string;

  @ManyToOne(() => VehicleBrand)
  @JoinColumn({ name: 'brand_id' })
  brand: VehicleBrand;

  @Column({
    name: 'vehicle_type',
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  vehicleType: string;

  @Column({ name: 'engine_capacity', type: 'int', nullable: false })
  engineCapacity: number;

  @Column({ name: 'bike_type', type: 'varchar', length: 50, nullable: false })
  bikeType: string;

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
import { WHEELIE_DB } from '@/common/constants';
import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { VehicleModel } from './vehiclemodel.entity';
import { ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { VehicleImage } from './vehicleimages.entity';

export enum VehicleType {
  Car = 'car',
  Motorbike = 'motorbike',
}

@Entity({ database: WHEELIE_DB, name: 'vehicles' })
export class Vehicle {
  
  @OneToMany(() => VehicleImage, (image) => image.vehicle)
  images: VehicleImage[];

  @ManyToOne(() => VehicleModel)
  @JoinColumn({ name: 'model_id' })
  model: VehicleModel;
  
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    nullable: false,
  })
  id: string;

  @Column({
    name: 'license_plate',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  licensePlate: string;

  @Column({
    name: 'model_id',
    type: 'uuid',
    nullable: false,
  })
  modelId: string;

  @Column({
    name: 'year',
    type: 'int',
    nullable: false,
  })
  year: number;

  @Column({
    name: 'price_per_day',
    type: 'decimal',
    nullable: false,
  })
  pricePerDay: number;

  @Column({
    name: 'location_id',
    type: 'uuid',
    nullable: false,
  })
  locationId: string;

  @Column({
    name: 'is_available',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isAvailable: true;

  @Column({
    name: 'vehicle_type',
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  vehicleType: VehicleType;

  @Column({
    name: 'is_deleted',
    type: 'boolean',
    default: false,
  })
  isDeleted?: boolean;

  @Column({
    name: 'created_user',
    type: 'int',
    nullable: false,
  })
  createdUser: number;

  @Column({
    name: 'created_date',
    type: 'timestamp',
    default: Date.now(),
  })
  createdAt: Date;

  @Column({
    name: 'updated_user',
    type: 'int',
    nullable: false,
  })
  updatedUser: number;

  @Column({
    name: 'updated_date',
    type: 'timestamp',
    default: Date.now(),
  })
  updatedAt: Date;

  @Column({
    name: 'color',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  color: string;
}

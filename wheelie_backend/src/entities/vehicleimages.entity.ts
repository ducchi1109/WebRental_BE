import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity('vehicle_images')
export class VehicleImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'vehicle_id' })
  vehicleId: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @Column({ name: 'created_user' })
  createdUser: string;

  @Column({ name: 'created_date', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ name: 'updated_user', nullable: true })
  updatedUser: string;

  @Column({ name: 'updated_date', nullable: true })
  updatedDate: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.images)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;
}

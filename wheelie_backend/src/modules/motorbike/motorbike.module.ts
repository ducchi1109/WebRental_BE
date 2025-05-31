import { Module } from '@nestjs/common';
import { MotorbikeService } from './motorbike.service';
import { MotorbikeV1Controller } from '../../controllers/motorbikes/motorbike-v1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '@/entities/vehicle.entity';
import { VehicleListingController } from '@/controllers/vehicle-listing/vehicle-listing.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [MotorbikeV1Controller, VehicleListingController],
  providers: [MotorbikeService],
})
export class MotorbikeModule {}

import { Injectable } from '@nestjs/common';
import { Motorbike } from '../../entities/motobike.entity';
import { bikes } from '@mocks/bikes.json';
import { Repository } from 'typeorm';
import { Vehicle } from '@/entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MotorbikeService {
  private motorbikes: Motorbike[];

  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepostitory: Repository<Vehicle>,
  ) {
    this.motorbikes = bikes;
  }

  async getAvailableVehicles() {
    return await this.vehicleRepostitory.find({
      where: {
        isAvailable: true,
        isDeleted: false,
      },
    });
  }

  getAvailableMockMotobikes(brand?: string): any[] {
    return (
      this.motorbikes
        // .filter((m) => m.available)
        .filter((m) => !brand || m.brand.toLowerCase() === brand.toLowerCase())
    );
  }

  getMockMotobikeById(id: number) {
    const bike = this.motorbikes.find((m) => m.id === id);

    if (!bike) {
      return null;
    }

    return bike;
  }
}

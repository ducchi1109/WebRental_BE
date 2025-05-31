import { MotorbikeService } from '@/modules/motorbike/motorbike.service';
import { Controller, Get } from '@nestjs/common';

@Controller('vehicles')
export class VehicleListingController {
  constructor(private readonly motorbikeService: MotorbikeService) {}

  @Get()
  async getVehiclesForListing() {
    return await this.motorbikeService.getAvailableVehicles();
  }
}

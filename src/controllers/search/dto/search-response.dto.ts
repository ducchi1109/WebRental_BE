import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from 'src/entities/vehicle.entity';

export class VehicleBrandDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  brandName: string;
}

export class VehicleModelDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  modelName: string;

  @ApiProperty({ type: VehicleBrandDTO })
  brand: VehicleBrandDTO;
}

export class VehicleResponseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  licensePlate: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  pricePerDay: number;

  @ApiProperty()
  locationId: string;

  @ApiProperty()
  isAvailable: boolean;

  @ApiProperty()
  vehicleType: string;

  @ApiProperty()
  color: string;

  @ApiProperty({ type: VehicleModelDTO })
  model: VehicleModelDTO;

  @ApiProperty({ type: [String] })
  images: string[]; 
}

class PaginationDTO {
  @ApiProperty({ description: 'Total number of items', example: 25 })
  totalItems: number;

  @ApiProperty({ description: 'Current page number', example: 1 })
  currentPage: number;

  @ApiProperty({ description: 'Total number of pages', example: 3 })
  totalPages: number;
}

export class SearchResponseDTO {
  @ApiProperty({ type: [VehicleResponseDTO], description: 'List of vehicles' })
  data: VehicleResponseDTO[];

  @ApiProperty({ type: PaginationDTO, description: 'Pagination metadata' })
  pagination: PaginationDTO;
}

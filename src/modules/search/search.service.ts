// src/modules/search/search.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle, VehicleType } from '../../entities/vehicle.entity';
import { VehicleResponseDTO } from '../../controllers/search/dto/search-response.dto';
import { SearchRequestDTO } from '../../controllers/search/dto/search-request.dto';
import { Brackets } from 'typeorm';
import { DetailResponseDTO } from '../../controllers/search/dto/detail-response.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async searchVehicles(
    query: SearchRequestDTO,
    page: number,
    perPage: number,
  ): Promise<[VehicleResponseDTO[], number]> {
    const { keyword, priceMin, priceMax } = query;
    const queryBuilder = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.model', 'model') // property `model` trong Vehicle
      .leftJoinAndSelect('model.brand', 'brand')   // property `brand` trong VehicleModel
      .leftJoinAndSelect('vehicle.images', 'images');

    queryBuilder.where('vehicle.isAvailable = :isAvailable', {
      isAvailable: true,
    });

    const cleanedKeyword = keyword ? keyword.trim().toLowerCase() : '';

    if (cleanedKeyword) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(vehicle.color) ILIKE :keyword', {
            keyword: `%${cleanedKeyword}%`,
          })
            .orWhere('vehicle.year::text LIKE :keyword', {
              keyword: `%${cleanedKeyword}%`,
            })
            .orWhere('LOWER(model.model_name) ILIKE :keyword', {
              keyword: `%${cleanedKeyword}%`,
            })
            .orWhere('LOWER(model.vehicle_type) ILIKE :keyword', {
              keyword: `%${cleanedKeyword}%`,
            })
            .orWhere('LOWER(brand.brand_name) ILIKE :keyword', {
              keyword: `%${cleanedKeyword}%`,
            });
        }),
      );
    }

    if (priceMin) {
      queryBuilder.andWhere('vehicle.pricePerDay >= :priceMin', { priceMin });
    }

    if (priceMax) {
      queryBuilder.andWhere('vehicle.pricePerDay <= :priceMax', { priceMax });
    }

    queryBuilder
      .skip((page - 1) * perPage).take(perPage)

    const [vehicles, total] = await queryBuilder.getManyAndCount();

    const vehicleDtos: VehicleResponseDTO[] = vehicles.map((v) => ({
      id: v.id,
      licensePlate: v.licensePlate,
      year: v.year,
      pricePerDay: v.pricePerDay,
      locationId: v.locationId,
      isAvailable: v.isAvailable,
      vehicleType: v.vehicleType,
      color: v.color,
      model: {
        id: v.model.id,
        modelName: v.model.modelName,
        engineCapacity: v.model.engineCapacity,
        bikeType: v.model.bikeType,
        brand: {
          id: v.model.brand.id,
          brandName: v.model.brand.brandName,
        },
      },
      images: v.images.map((image) => image.imageUrl),
    }));
    
    return [vehicleDtos, total];
;
  }

  async getVehicleById(id: string): Promise<DetailResponseDTO | null> {
  const clean_id = id.trim().toLowerCase();
  const vehicle = await this.vehicleRepository
    .createQueryBuilder('vehicle')
    .leftJoinAndSelect('vehicle.model', 'model')
    .leftJoinAndSelect('model.brand', 'brand')
    .leftJoinAndSelect('vehicle.images', 'images')
    .where('vehicle.id = :id', { id : clean_id })
    .andWhere('vehicle.isDeleted = false')
    .getOne();

  if (!vehicle) {
    return null;
  }
  return {
    id: vehicle.id,
    license_plate: vehicle.licensePlate,
    model_id: vehicle.modelId,
    year: vehicle.year,
    color: vehicle.color,
    price_per_day: Number(vehicle.pricePerDay),
    location_id: vehicle.locationId,
    is_available: vehicle.isAvailable,
    vehicle_type: vehicle.vehicleType,
    is_deleted: vehicle.isDeleted ?? false,
    created_user: vehicle.createdUser.toString(),
    created_date: vehicle.createdAt,
    updated_user: vehicle.updatedUser?.toString() || null,
    updated_date: vehicle.updatedAt || null,
    model: {
      id: vehicle.model.id,
      modelName: vehicle.model.modelName,
      engineCapacity: vehicle.model.engineCapacity,
      bikeType: vehicle.model.bikeType,
      brand: {
        id: vehicle.model.brand.id,
        brandName: vehicle.model.brand.brandName,
      },
    },
    images: vehicle.images.map((image) => image.imageUrl),
  };
}
}


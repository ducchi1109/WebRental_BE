import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehicle } from '../../entities/vehicle.entity';
import { Repository } from 'typeorm';
import { SearchRequestDTO } from '../../controllers/search/dto/search-request.dto';

describe('SearchService', () => {
  let service: SearchService;
  let vehicleRepository: Repository<Vehicle>;

  const mockQueryBuilder = {
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
  };

  const mockVehicleRepository = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: mockVehicleRepository,
        },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
    vehicleRepository = module.get<Repository<Vehicle>>(
      getRepositoryToken(Vehicle),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchVehicles', () => {
    it('should search vehicles with basic pagination', async () => {
      const query: SearchRequestDTO = {
        pickupLocation: 'test',
        pickupDate: '2024-04-01',
        dropoffDate: '2024-04-02',
      };
      const page = 1;
      const perPage = 10;

      const [vehicles, total] = await service.searchVehicles(
        query,
        page,
        perPage,
      );

      expect(vehicles).toBeDefined();
      expect(total).toBeDefined();
      expect(mockVehicleRepository.createQueryBuilder).toHaveBeenCalled();
    });

    it('should search vehicles with keyword filter', async () => {
      const query: SearchRequestDTO = {
        keyword: 'red',
        pickupLocation: 'test',
        pickupDate: '2024-04-01',
        dropoffDate: '2024-04-02',
      };
      const page = 1;
      const perPage = 10;

      await service.searchVehicles(query, page, perPage);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalled();
    });

    it('should search vehicles with price range filter', async () => {
      const query: SearchRequestDTO = {
        priceMin: 50,
        priceMax: 100,
        pickupLocation: 'test',
        pickupDate: '2024-04-01',
        dropoffDate: '2024-04-02',
      };
      const page = 1;
      const perPage = 10;

      await service.searchVehicles(query, page, perPage);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledTimes(2); // Once for min, once for max
    });

    it('should search vehicles with all filters', async () => {
      const query: SearchRequestDTO = {
        keyword: '2020',
        priceMin: 50,
        priceMax: 100,
        pickupLocation: 'test',
        pickupDate: '2024-04-01',
        dropoffDate: '2024-04-02',
      };
      const page = 1;
      const perPage = 10;

      await service.searchVehicles(query, page, perPage);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledTimes(3); // Keyword, min price, max price
    });
  });
});

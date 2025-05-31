import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SearchRequestDTO {
  @ApiPropertyOptional({
    description: 'Keyword for searching bikes',
    required: false,
  })
  keyword?: string;

  @ApiProperty({
    description: 'Pick-up location ID',
    example: '550e8400-e29b-41d4-a716-446655440000', // UUID mẫu
  })
  @IsUUID() // Đảm bảo rằng đây là UUID hợp lệ
  pickupLocation: string;

  @ApiPropertyOptional({
    description: 'Drop-off location ID',
    example: '550e8400-e29b-41d4-a716-446655440000', // UUID mẫu
  })
  @IsUUID() // Đảm bảo đây cũng là UUID hợp lệ
  dropoffLocation?: string;

  @ApiProperty({
    description: 'Pick-up date (YYYY-MM-DD)',
    example: '2025-04-05',
  })
  pickupDate: string;

  @ApiProperty({
    description: 'Drop-off date (YYYY-MM-DD)',
    example: '2025-04-10',
  })
  dropoffDate: string;

  @ApiPropertyOptional({
    description: 'Minimum price per day',
    example: 100000,
  })
  priceMin?: number;

  @ApiPropertyOptional({
    description: 'Maximum price per day',
    example: 500000,
  })
  priceMax?: number;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    default: 1,
  })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Results per page',
    example: 10,
    default: 10,
  })
  perPage?: number = 10;
}

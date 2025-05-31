import { ApiProperty } from '@nestjs/swagger';

export class DetailResponseDTO {
  @ApiProperty({ example: 'a6678662-5f4b-47f4-99b0-547031708955' })
  id: string;

  @ApiProperty({ example: 'abcd1', description: 'Biển số xe' })
  license_plate: string;

  @ApiProperty({ example: '1234', description: 'ID của model xe' })
  model_id: string;

  @ApiProperty({ example: 2019, description: 'Năm sản xuất' })
  year: number;

  @ApiProperty({ example: 'red', description: 'Màu xe' })
  color: string;

  @ApiProperty({ example: 150000, description: 'Giá thuê mỗi ngày (VND)' })
  price_per_day: number;

  @ApiProperty({
    example: 'cd3be25f-b022-484c-878b-b1e36433c8de',
    description: 'ID vị trí',
  })
  location_id: string;

  @ApiProperty({ example: true, description: 'Xe đang khả dụng hay không' })
  is_available: boolean;

  @ApiProperty({ example: 'motorbike', description: 'Loại phương tiện' })
  vehicle_type: string;

  @ApiProperty({ example: false, description: 'Xe đã bị xóa chưa' })
  is_deleted: boolean;

  @ApiProperty({
    example: '35a3c2a8-55e9-4df2-b70d-39e5f1bde969',
    description: 'ID người tạo',
  })
  created_user: string;

  @ApiProperty({ example: '2025-04-03T10:16:57.958Z', description: 'Ngày tạo' })
  created_date: Date;

  @ApiProperty({ example: null, description: 'ID người cập nhật gần nhất' })
  updated_user: string | null;

  @ApiProperty({ example: null, description: 'Ngày cập nhật gần nhất' })
  updated_date: Date | null;

  @ApiProperty({
    example: {
      id: '12345',
      modelName: 'Honda',
      engineCapacity: 150,
      bikeType: 'Sport',
      brand: {
        id: '67890',
        brandName: 'Honda',
      },
    },
    description: 'Thông tin model xe',
  })
  model: {
    id: string;
    modelName: string;
    engineCapacity: number;
    bikeType: string;
    brand: {
      id: string;
      brandName: string;
    };
  };

  @ApiProperty({
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    description: 'Danh sách hình ảnh xe',
  })
  images: string[];
}

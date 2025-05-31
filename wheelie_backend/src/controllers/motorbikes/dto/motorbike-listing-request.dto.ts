import { ApiProperty } from '@nestjs/swagger';

export class MotorbikeListingRequestDTO {
  @ApiProperty()
  data: {};

  @ApiProperty()
  pagination: {};
}

import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { MotorbikeService } from '../../modules/motorbike/motorbike.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('v1/motorbikes')
export class MotorbikeV1Controller {
  constructor(private readonly motorbikeService: MotorbikeService) {}

  @ApiOperation({
    summary: 'Get a paginated list of available bikes for listing',
  })
  @ApiQuery({
    name: 'brand',
    type: String,
    description: 'The brand of the motorbike',
    required: false,
  })
  @Get()
  getAvailableMotobikes(@Query('brand') brand?: string) {
    const bikes = this.motorbikeService.getAvailableMockMotobikes(brand);
    return {
      data: {
        bikes,
      },
      pagination: {
        currentPage: 1,
        totalPages: 10,
      },
    };
  }

  @ApiOperation({
    summary: 'Get a motorbike detail information',
  })
  @ApiOkResponse({ description: 'Found' })
  @ApiNotFoundResponse({ description: 'Bike Not Found' })
  @Get(':id')
  @HttpCode(200)
  getMotobikeById(@Param('id') id: number) {
    const bike = this.motorbikeService.getMockMotobikeById(+id);

    if (!bike) {
      throw new HttpException('Bike Not Found', HttpStatus.NOT_FOUND);
    }

    return {
      data: {
        bike,
      },
    };
  }
}

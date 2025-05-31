import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { SearchService } from '../../modules/search/search.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { DetailResponseDTO } from './dto/detail-response.dto';

@Controller('search')
export class DetailController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({ summary: 'Get detail of a vehicle by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  async getVehicleDetail(@Param('id') id: string): Promise<DetailResponseDTO> {
    const vehicle = await this.searchService.getVehicleById(id);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }

    return vehicle;
  }
}

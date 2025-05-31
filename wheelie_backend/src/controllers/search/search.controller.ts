// src/controllers/search/search.controller.ts

import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from '../../modules/search/search.service';
import { SearchRequestDTO } from './dto/search-request.dto';
import { SearchResponseDTO } from './dto/search-response.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({
    summary:
      'Search for available vehicles By: Keyword (color/y1ear/Model/Brand), Price range, Pagination',
  })
  @Get()
  async searchVehicles(
    @Query() query: SearchRequestDTO,
  ): Promise<SearchResponseDTO> {
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 10;

    const [vehicles, total] = await this.searchService.searchVehicles(
      query,
      page,
      perPage,
    );

    return {
      data: vehicles,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }
}

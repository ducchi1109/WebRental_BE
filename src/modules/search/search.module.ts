import { Module } from '@nestjs/common';
import { SearchController } from '../../controllers/search/search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '../../entities/vehicle.entity';
import { DetailController } from '../../controllers/search/detail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [SearchController, DetailController],
  providers: [SearchService],
})
export class SearchModule {}

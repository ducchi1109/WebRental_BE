import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from '@/controllers/sample.controller';

@Module({
  controllers: [SampleController],
  providers: [SampleService],
  exports: [SampleService],
})
export class SampleModule {}

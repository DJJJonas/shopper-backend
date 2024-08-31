import { Module } from '@nestjs/common';
import { MeasureService } from './service/measure.service';
import { MeasureController } from './web/measure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measure } from './core/measure.entity';
import { Customer } from '../customer/core/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Measure, Customer])],
  controllers: [MeasureController],
  providers: [MeasureService],
  exports: [TypeOrmModule],
})
export class MeasureModule {}

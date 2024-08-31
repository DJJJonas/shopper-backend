import { Module } from '@nestjs/common';
import { CustomerService } from './service/customer.service';
import { CustomerController } from './web/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measure } from '../measure/core/measure.entity';
import { Customer } from './core/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Measure])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [TypeOrmModule],
})
export class CustomerModule {}

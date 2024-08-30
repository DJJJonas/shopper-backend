import { forwardRef, Module } from '@nestjs/common';
import { customerProviders } from './infra/customer.providers';
import { CustomerController } from './web/customer.controller';
import { CustomerService } from './service/customer.service';
import { MeasureModule } from '../measure/measure.module';

@Module({
  imports: [forwardRef(() => MeasureModule)],
  controllers: [CustomerController],
  providers: [CustomerService, ...customerProviders],
  exports: [CustomerService],
})
export class CustomerModule {}

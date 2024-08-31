import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './domains/customer/customer.module';
import { CustomerService } from './domains/customer/service/customer.service';
import { CustomerController } from './domains/customer/web/customer.controller';
import { MeasureModule } from './domains/measure/measure.module';
import { MeasureService } from './domains/measure/service/measure.service';
import { MeasureController } from './domains/measure/web/measure.controller';
import { GeminiModule } from './providers/gemini/gemini.module';
import configModuleOptions from './config/config-module-options.config';
import typeormModuleOptions from './config/typeorm-module-options.config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRoot(typeormModuleOptions()),
    GeminiModule,

    MeasureModule,
    CustomerModule,
  ],
  controllers: [MeasureController, CustomerController],
  providers: [MeasureService, CustomerService],
})
export class AppModule {}

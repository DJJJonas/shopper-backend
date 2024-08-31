import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configModuleOptions from './config/config-module-options.config';
import typeormModuleOptions from './config/typeorm-module-options.config';
import { CustomerModule } from './domains/customer/customer.module';
import { MeasureModule } from './domains/measure/measure.module';
import { GeminiModule } from './providers/gemini/gemini.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRoot(typeormModuleOptions()),
    GeminiModule,

    MeasureModule,
    CustomerModule,
  ],
})
export class AppModule {}

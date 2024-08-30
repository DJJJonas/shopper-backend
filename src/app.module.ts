import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './domains/customer/customer.module';
import { customerProviders } from './domains/customer/infra/customer.providers';
import { CustomerService } from './domains/customer/service/customer.service';
import { CustomerController } from './domains/customer/web/customer.controller';
import { measureProviders } from './domains/measure/infra/measure.providers';
import { MeasureModule } from './domains/measure/measure.module';
import { MeasureService } from './domains/measure/service/measure.service';
import { MeasureController } from './domains/measure/web/measure.controller';
import { GeminiModule } from './providers/gemini/gemini.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
      migrationsRun: true,
      migrationsTableName: 'migrations',
    }),
    GeminiModule,
    MeasureModule,
    CustomerModule,
  ],
  controllers: [MeasureController, CustomerController],
  providers: [
    MeasureService,
    CustomerService,
    ...measureProviders,
    ...customerProviders,
  ],
})
export class AppModule {}

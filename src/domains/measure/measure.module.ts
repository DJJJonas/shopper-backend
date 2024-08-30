import { forwardRef, Module } from '@nestjs/common';
import { GeminiModule } from '~/providers/gemini/gemini.module';
import { CustomerModule } from '../customer/customer.module';
import { measureProviders } from './infra/measure.providers';
import { MeasureService } from './service/measure.service';
import { MeasureController } from './web/measure.controller';

@Module({
  imports: [GeminiModule, forwardRef(() => CustomerModule)],
  controllers: [MeasureController],
  providers: [MeasureService, ...measureProviders],
  exports: [MeasureService],
})
export class MeasureModule {}

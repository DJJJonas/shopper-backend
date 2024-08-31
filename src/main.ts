import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger-setup.config';
import validationPipeOptions from './config/validation-pipe-options.config';
import { PORT, REQUEST_BODY_SIZE_LIMIT as limit } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.use(json({ limit }));
  setupSwagger(app);

  await app.listen(PORT);
}
bootstrap();

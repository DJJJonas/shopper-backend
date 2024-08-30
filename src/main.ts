import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 400 }));

  const config = new DocumentBuilder()
    .setTitle('Consumo de água e gás')
    .setDescription(
      'Serviço de gerenciamento de leitura individualizada de consumo de água e gás',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  app.use(json({ limit: '200mb' }));

  await app.listen(3000);
}
bootstrap();

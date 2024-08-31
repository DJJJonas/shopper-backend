import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Consumo de água e gás')
    .setDescription(
      'Serviço de gerenciamento de leitura individualizada de consumo de água e gás',
    )
    .build();

  const options = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('', app, options);
}

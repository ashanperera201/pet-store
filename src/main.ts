import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const applicationConfig = app.get<ConfigService>(ConfigService)?.get('applicationConfig');
  const port = app.get<ConfigService>(ConfigService)?.get('port');

  const config = new DocumentBuilder().setTitle(applicationConfig.serverTitle).setDescription(applicationConfig.applicationServerDescription).setVersion(applicationConfig.apiVersion).build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(applicationConfig.swaggerUri, app, document);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  console.log(`App is going to listening on this port ${port}`);

  await app.listen(port);
}
bootstrap();

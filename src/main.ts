import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from './common/config/schemas';
import { extractErrorMessages } from './common/helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const appConfig = app.get(AppConfig);

  //define useContainer in main.ts file
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(extractErrorMessages(validationErrors));
      },
    }),
  );

  // Global serialization
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'exposeAll',
    }),
  );

  app.useBodyParser('json', { limit: '100mb' });

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Country App INFO')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, { jsonDocumentUrl: 'api/schema' });

  // Run server on PORT
  app.listen(appConfig.port);
}

bootstrap();

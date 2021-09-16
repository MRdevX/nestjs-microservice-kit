import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import config from '@root/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const environment = config.get('app.env');

  app.use(helmet());
  app.enableCors({ origin: true, credentials: true });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: environment === 'production',
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (environment !== 'production') {
    const options = new DocumentBuilder()
      .setTitle(process.env.npm_package_name)
      .setVersion(process.env.npm_package_version)
      .setDescription(process.env.npm_package_description)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/v1/docs', app, document);
  }

  await app.listen(config.get('app.port'), config.get('app.host'), () => {
    console.log(`Server started on ${config.get('app.host')}:${config.get('app.port')}, env: ${environment}`, 'App');
    console.log(`Connected to db "${config.get('db.name')}"`, 'Database');
  });
}
process.nextTick(bootstrap);

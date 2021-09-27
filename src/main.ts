import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import config from '@root/config';

async function bootstrap() {
  const env = config.get('app.env');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: ['log', 'error', 'warn'] });

  app.connectMicroservice(config.get('s2s'));

  app.use(helmet());
  app.set('trust proxy', 1);
  app.enableCors({ origin: config.get('app.cors'), credentials: true });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: env === 'production',
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (env !== 'production') {
    const options = new DocumentBuilder()
      .setTitle(process.env.npm_package_name)
      .setVersion(process.env.npm_package_version)
      .setDescription(process.env.npm_package_description)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/v1/doc', app, document);
  }

  await app.startAllMicroservices();
  await app.listen(config.get('app.port'), config.get('app.host'), () => {
    console.info(`Server started on ${config.get('app.host')}:${config.get('app.port')}, env: ${env}`, 'App');
    console.info(`Connected to db "${config.get('db.name')}"`, 'Database');
    console.info(JSON.stringify(config.get('app.cors').map((v) => v.toString())), 'CORS');
  });
}

process.nextTick(bootstrap);

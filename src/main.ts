import { NestFactory } from '@nestjs/core';
import { ChimeModule } from './chime/chime.module';
import { ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(ChimeModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  mongoose.set('debug', true);
  const server = await app.listen(8080);
  console.log('server connected: ', server.address());
}

bootstrap();

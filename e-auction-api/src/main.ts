import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('e-auction/api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3002);
}
bootstrap();

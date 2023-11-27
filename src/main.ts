/**
 * Main TS
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
// app.enableCors({
//   origin: [
//     'https://mymedxpress.netlify.app/',
//     'http://localhost:4200',
//     'http://localhost:3000',
//   ],
//   credentials: true,
// });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  // await app.listen(3001);
  await new Promise((resolve) => mongoose.connection.on('connected', resolve));

  if (mongoose.connection.readyState === 1) {
    console.log('Database connection established');
    await app.listen(3000);
  } else {
    console.error('Error getting database connection');
    return;
  }
}
bootstrap();

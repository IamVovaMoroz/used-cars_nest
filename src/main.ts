import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// import * as cookieSession from 'cookie-session';
const cookieSession = require('cookie-session')


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      name: 'session',
      keys: ['key1', 'key2'],
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: false, // true in production for HTTPS
      httpOnly: true,
    }),
  );
  await app.listen(3003);
}
bootstrap();

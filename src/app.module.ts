import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
const cookieSession = require('cookie-session')

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: "db.sqlite",
    entities: [User, Report],
    synchronize: true

  }), UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    }
  ],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      name: 'session',
      keys: ['key1', 'key2'],
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: false, // true in production for HTTPS
      httpOnly: true,
    }),).forRoutes('*');

  }
}

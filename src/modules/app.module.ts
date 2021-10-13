import { Module } from '@nestjs/common';
import { typeOrmConfig } from './../config/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from 'src/service/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { HealthModule } from './health.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const password = configService.get('DB_PASSWORD');
        const username = configService.get('DB_USERNAME');
        const host = configService.get('DB_CONNECTION_STRING');
        return {
          ...typeOrmConfig,
          host,
          password,
          username,
        };
      },
      inject: [ConfigService],
    }),
    HealthModule,
    CqrsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

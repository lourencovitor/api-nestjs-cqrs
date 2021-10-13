import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from 'src/controller/users/users.controller';
import Handlers from '../handlers/users';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/model/users.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User]),],
  controllers: [UsersController],
  providers: [...Handlers],
  exports: [],
})
export class UsersModule {}

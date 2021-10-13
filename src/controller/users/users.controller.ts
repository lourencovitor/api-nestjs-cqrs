import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { GetUsersResponseDto } from './dto/get-users.dto';
import { GetUsersQuery } from '../../handlers/users/get-users/get-users.query';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetUsersResponseDto] })
  getUsers(): Promise<Array<GetUsersResponseDto>> {
    const users = plainToClass(GetUsersQuery, {});
    return this.queryBus.execute(users);
  }
}

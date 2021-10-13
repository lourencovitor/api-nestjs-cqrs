import { Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { GetUsersResponseDto } from './dto/get-users.dto';
import { GetUsersQuery } from '../../handlers/users/get-users/get-users.query';
import { CreateUsersDto } from './dto/create-users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private queryBus: QueryBus, private commandBus:CommandBus) {}

  @Get()
  @ApiOkResponse({ type: [GetUsersResponseDto] })
  getUsers(): Promise<Array<GetUsersResponseDto>> {
    const users = plainToClass(GetUsersQuery, {});
    return this.queryBus.execute(users);
  }

  @Post()
  @ApiBody({ type: CreateUsersDto})
  @ApiOkResponse({ type: String})
  createUser(): Promise<string> {
    // const user = plainToClass(CreateUserCommand, {})
    // return this.commandBus.execute(user)
    return null
  }
}

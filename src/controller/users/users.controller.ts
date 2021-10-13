import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { GetUsersResponseDto } from './dto/get-users.dto';
import { GetUsersQuery } from '../../handlers/users/get-users/get-users.query';
import { CreateUsersDto } from './dto/create-users.dto';
import { CreateUsersCommand } from 'src/handlers/users/create-users/create-users.command';

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
  createUser(
    @Body() createUsersDto: CreateUsersDto
  ): Promise<string> {
    const user = plainToClass(CreateUsersCommand, createUsersDto)
    return this.commandBus.execute(user)
  }
}

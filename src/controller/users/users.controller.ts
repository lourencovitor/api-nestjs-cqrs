import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { GetUsersResponseDto } from './dto/get-users.dto';
import { GetUsersQuery } from '../../handlers/users/get-users/get-users.query';
import { CreateUsersDto } from './dto/create-users.dto';
import { CreateUsersCommand } from 'src/handlers/users/create-users/create-users.command';
import { GetUsersByIdQuery } from 'src/handlers/users/get-users-by-id/get-users-by-id.query';
import { HttpExceptionFilter } from 'src/service/http-exception.filter';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private queryBus: QueryBus, private commandBus:CommandBus) {}

  @Get()
  @ApiOkResponse({ type: [GetUsersResponseDto] })
  @UseFilters(new HttpExceptionFilter())
  getUsers(): Promise<Array<GetUsersResponseDto>> {
    const users = plainToClass(GetUsersQuery, {});
    return this.queryBus.execute(users);
  }

  @Post()
  @ApiBody({ type: CreateUsersDto})
  @ApiOkResponse({ type: String})
  @UseFilters(new HttpExceptionFilter())
  createUser(
    @Body() createUsersDto: CreateUsersDto
  ): Promise<string> {
    const user = plainToClass(CreateUsersCommand, createUsersDto)
    return this.commandBus.execute(user)
  }

  @Get('/:userId')
  @ApiOkResponse({ type: GetUsersResponseDto })
  @ApiParam({ name: 'userId' })
  @UseFilters(new HttpExceptionFilter())
  getUser(
    @Param() userId: string,
  ): Promise<GetUsersResponseDto> {
    const user = plainToClass(GetUsersByIdQuery, {userId});
    return this.queryBus.execute(user);
  }
}

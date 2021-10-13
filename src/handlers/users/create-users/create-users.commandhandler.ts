import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User } from 'src/model/users.entity';
import { Repository } from 'typeorm';
import { CreateUsersCommand } from './create-users.command';

@CommandHandler(CreateUsersCommand)
export class CreateUsersCommandHandler implements ICommandHandler<CreateUsersCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(command: CreateUsersCommand): Promise<String> {
      const user = plainToClass(User, command);
    const result = await this.userRepository.insert(user);

    if (!result.raw.length) {
        throw new InternalServerErrorException('User registration failed');
      }
    
      return result.raw[0].userId;
  }
}

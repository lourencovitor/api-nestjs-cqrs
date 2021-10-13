import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User } from 'src/model/users.entity';
import { Repository } from 'typeorm';
import { UpdateUsersCommand } from './update-users.command';

@CommandHandler(UpdateUsersCommand)
export class UpdateUsersCommandHandler implements ICommandHandler<UpdateUsersCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(command: UpdateUsersCommand): Promise<null> {
    const user = plainToClass(User, command);
    delete user.userId
    
    const result = await this.userRepository.update(command.userId, {...user});

    if (!result.affected) {
        throw new InternalServerErrorException('User update failed');
      }
    
      return null;
  }
}

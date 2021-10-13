import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/users.entity';
import { Repository } from 'typeorm';
import { DeleteUsersCommand } from './delete-users.command';

@CommandHandler(DeleteUsersCommand)
export class DeleteUsersCommandHandler implements ICommandHandler<DeleteUsersCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(command: DeleteUsersCommand): Promise<null> {
    const result = await this.userRepository.softDelete(command.userId);

    if (!result.affected) {
        throw new InternalServerErrorException('User delete failed');
      }
    
      return null;
  }
}

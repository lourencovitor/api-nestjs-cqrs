import { NotFoundException } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/users.entity';
import { Repository } from 'typeorm';
import { GetUsersByIdQuery } from './get-users-by-id.query';

@QueryHandler(GetUsersByIdQuery)
export class GetUsersByIdQueryHandler implements IQueryHandler<GetUsersByIdQuery> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: GetUsersByIdQuery): Promise<any> {
    const user = await this.userRepository.findOne(query.userId);

    if(!user){
        throw new NotFoundException('No user found')
    }
    
    return user
  }
}

import { NotFoundException } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/users.entity';
import { Repository } from 'typeorm';
import { GetUsersQuery } from './get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(): Promise<any> {
    const users = await this.userRepository.find();

    if(!users.length){
        throw new NotFoundException('No user found')
    }
    
    return users
  }
}

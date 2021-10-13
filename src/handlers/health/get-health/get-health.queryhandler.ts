import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetHealthQuery } from './get-health.query';

@QueryHandler(GetHealthQuery)
export class GetHealthQueryHandler implements IQueryHandler<GetHealthQuery> {
  constructor() {}

  async execute(query: GetHealthQuery): Promise<any> {
    return 1;
  }
}

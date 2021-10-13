import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetHealthQuery } from 'src/handlers/health/get-health/get-health.query';
import { plainToClass } from 'class-transformer';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: Boolean })
  getHealth(): Promise<number> {
    const query = plainToClass(GetHealthQuery, {});
    return this.queryBus.execute(query);
  }
}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HealthController } from 'src/controller/health/health.controller';
import Handlers from '../handlers/health';

@Module({
  imports: [CqrsModule],
  controllers: [HealthController],
  providers: [...Handlers],
  exports: [],
})
export class HealthModule {}

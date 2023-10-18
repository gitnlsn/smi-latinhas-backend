import { Module } from '@nestjs/common';
import { ProductionRequestsService } from './production-requests.service';
import { ProductionRequestsGateway } from './production-requests.gateway';

@Module({
  providers: [ProductionRequestsGateway, ProductionRequestsService],
})
export class ProductionRequestsModule {}

import { Module } from '@nestjs/common';
import { ProductionRequestsModule } from './production-requests/production-requests.module';

@Module({
  imports: [ProductionRequestsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

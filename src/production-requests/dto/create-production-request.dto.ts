import { ProductionRequest } from '../entities/production-request.entity';

export class CreateProductionRequestDto {
  sku: number;
  description: string;
  plan: number;

  start: Date;
  end: Date;
}

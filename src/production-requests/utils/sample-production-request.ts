import { ProductionRequest } from '../entities/production-request.entity';
import { generateId } from './generateId';

export const sampleProductionRequest: ProductionRequest = {
  id: generateId(),
  sku: 123,
  plan: 5000,
  description: 'sample request',

  start: new Date(2023, 10, 1),
  end: new Date(2023, 10, 1),
};

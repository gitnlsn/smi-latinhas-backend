import { Test, TestingModule } from '@nestjs/testing';
import { ProductionRequestsService } from './production-requests.service';
import { sampleProductionRequest } from './utils/sample-production-request';

describe('ProductionRequestsService', () => {
  let service: ProductionRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionRequestsService],
    }).compile();

    service = module.get<ProductionRequestsService>(ProductionRequestsService);
  });

  it('should create request', () => {
    const createdRequest = service.create({
      ...sampleProductionRequest,
    });

    expect(createdRequest.id).not.toBe(sampleProductionRequest.id);
    expect(createdRequest).toEqual({
      ...sampleProductionRequest,
      id: expect.anything(),
    });
  });

  it('should findAll requests', () => {
    service.create({
      ...sampleProductionRequest,
    });
    service.create({
      ...sampleProductionRequest,
    });
    service.create({
      ...sampleProductionRequest,
    });

    const requests = service.findAll();

    expect(requests.length).toBe(3);
  });

  it('should findOne request', () => {
    const firstRequest = service.create({
      ...sampleProductionRequest,
    });
    service.create({
      ...sampleProductionRequest,
    });
    service.create({
      ...sampleProductionRequest,
    });

    const existingRequest = service.findOne(firstRequest.id);

    expect(existingRequest.id).toBe(firstRequest.id);
  });

  it('should update request', () => {
    const createdRequest = service.create({
      ...sampleProductionRequest,
    });

    const updatedRequest = service.update({
      id: createdRequest.id,
      description: 'new description',
    });

    expect(updatedRequest.id).toBe(createdRequest.id);
    expect(updatedRequest.description).not.toBe(createdRequest.description);
    expect(updatedRequest.description).toBe('new description');
  });

  it('should remove request', () => {
    const createdRequest = service.create({
      ...sampleProductionRequest,
    });

    const removedRequest = service.remove(createdRequest.id);

    expect(removedRequest.id).toBe(createdRequest.id);

    expect(service.findAll().length).toBe(0);
  });
});

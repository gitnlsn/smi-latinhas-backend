import { Injectable } from '@nestjs/common';
import { CreateProductionRequestDto } from './dto/create-production-request.dto';
import { UpdateProductionRequestDto } from './dto/update-production-request.dto';
import { ProductionRequest } from './entities/production-request.entity';
import { generateId } from './utils/generateId';

@Injectable()
export class ProductionRequestsService {
  private requests: ProductionRequest[];

  constructor() {
    this.requests = [];
  }

  create(createProductionRequestDto: CreateProductionRequestDto) {
    const newRequest: ProductionRequest = {
      ...createProductionRequestDto,
      id: generateId(),
    };
    this.requests.push(newRequest);

    return newRequest;
  }

  findAll() {
    return [...this.requests];
  }

  findOne(id: string): ProductionRequest | undefined {
    return this.requests.find((request) => request.id === id);
  }

  update(updateProductionRequestDto: UpdateProductionRequestDto) {
    const existingRequest = this.findOne(updateProductionRequestDto.id);

    if (existingRequest === undefined) {
      return undefined;
    }

    const modifiedRequest: ProductionRequest = {
      ...existingRequest,
      ...updateProductionRequestDto,
    };

    this.requests = this.requests.map((request) => {
      if (request.id === existingRequest.id) {
        return modifiedRequest;
      }

      return request;
    });

    return modifiedRequest;
  }

  remove(id: string) {
    const existingRequest = this.findOne(id);

    if (existingRequest === undefined) {
      return undefined;
    }

    this.requests = this.requests.filter((request) => request.id !== id);

    return existingRequest;
  }
}

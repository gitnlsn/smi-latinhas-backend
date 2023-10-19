import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ProductionRequestsService } from './production-requests.service';
import { CreateProductionRequestDto } from './dto/create-production-request.dto';
import { UpdateProductionRequestDto } from './dto/update-production-request.dto';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ProductionRequestsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly productionRequestsService: ProductionRequestsService,
  ) {}

  @SubscribeMessage('createProductionRequest')
  create(
    @MessageBody() createProductionRequestDto: CreateProductionRequestDto,
  ) {
    const createdRequest = this.productionRequestsService.create(
      createProductionRequestDto,
    );
    if (createdRequest !== undefined) {
      this.server.emit('createdProductionRequest', createdRequest);
    }
    return createdRequest;
  }

  @SubscribeMessage('findAllProductionRequests')
  findAll() {
    return this.productionRequestsService.findAll();
  }

  @SubscribeMessage('findOneProductionRequest')
  findOne(@MessageBody() id: string) {
    return this.productionRequestsService.findOne(id);
  }

  @SubscribeMessage('updateProductionRequest')
  update(
    @MessageBody() updateProductionRequestDto: UpdateProductionRequestDto,
  ) {
    const updatedRequest = this.productionRequestsService.update(
      updateProductionRequestDto,
    );
    if (updatedRequest !== undefined) {
      this.server.emit('updatedProductionRequest', updatedRequest);
    }
    return updatedRequest;
  }

  @SubscribeMessage('removeProductionRequest')
  remove(@MessageBody() id: string) {
    const removedRequest = this.productionRequestsService.remove(id);
    if (removedRequest !== undefined) {
      this.server.emit('removedProductionRequest', removedRequest);
    }
    return removedRequest;
  }
}

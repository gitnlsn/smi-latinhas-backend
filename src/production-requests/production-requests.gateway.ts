import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { ProductionRequestsService } from './production-requests.service';
import { CreateProductionRequestDto } from './dto/create-production-request.dto';
import { UpdateProductionRequestDto } from './dto/update-production-request.dto';

@WebSocketGateway()
export class ProductionRequestsGateway {
  constructor(
    private readonly productionRequestsService: ProductionRequestsService,
  ) {}

  @SubscribeMessage('createProductionRequest')
  create(
    @MessageBody() createProductionRequestDto: CreateProductionRequestDto,
  ) {
    return this.productionRequestsService.create(createProductionRequestDto);
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
    return this.productionRequestsService.update(updateProductionRequestDto);
  }

  @SubscribeMessage('removeProductionRequest')
  remove(@MessageBody() id: string) {
    return this.productionRequestsService.remove(id);
  }
}

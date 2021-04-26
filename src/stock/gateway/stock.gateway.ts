import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { CreateStockDto } from '../dto/create-stock.dto';
import { Socket } from 'socket.io';
import { StockService } from '../service/stock.service';
import { Stock } from '../shared/stock.model';

@WebSocketGateway()
export class StockGateway {
  constructor(private stockservice: StockService) {}
  //make this for update price stock as well, with a new Dto for addPrice to Stocks
  @SubscribeMessage('create-stock')
  handleMessage(
    @MessageBody() data: CreateStockDto,
    // to show which 'client' created which stock in case of errors or else
    // its telling which socket is used meaning which connection was/is used.
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('data', data);
    const stock: Stock = {
      name: data.name,
      description: data.description,
      value: data.value,
    };
    try {
      this.stockservice.createStock(stock);
      client.emit('stock-created-success', stock);
      console.log('stock', this.stockservice.stocks);
    } catch (e) {
      client.emit('stock-created-error', e.message);
    }
  }
}

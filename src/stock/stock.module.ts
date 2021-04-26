import { Module } from '@nestjs/common';
import { StockService } from './service/stock.service';
import { StockGateway } from './gateway/stock.gateway';

@Module({
  providers: [StockService, StockGateway],
})
export class StockModule {}

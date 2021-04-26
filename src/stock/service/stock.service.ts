import { Injectable } from '@nestjs/common';
import { Stock } from '../shared/stock.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StockService {
  public stocks: Stock[] = [];

  createStock(stock: Stock): Stock {
    //validering af data ex forbudte navn osv.
    if (stock.name.length == 2) {
      throw new Error('stock name must be more than 2 characters');
    }
    stock.id = uuidv4();
    // this is for updateprice to find the stock with required id,
    // this.stocks.find(s => s.id === id);
    this.stocks.push(stock);
    return stock;
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class StockExchangeService {
  getHello(): string {
    return 'Hello World!';
  }
}

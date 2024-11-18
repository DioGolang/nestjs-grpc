import { Controller, Get } from '@nestjs/common';
import { StockExchangeService } from './stock-exchange.service';

@Controller()
export class StockExchangeController {
  constructor(private readonly stockExchangeService: StockExchangeService) {}

  @Get()
  getHello(): string {
    return this.stockExchangeService.getHello();
  }
}

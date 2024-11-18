import { Test, TestingModule } from '@nestjs/testing';
import { StockExchangeController } from './stock-exchange.controller';
import { StockExchangeService } from './stock-exchange.service';

describe('StockExchangeController', () => {
  let stockExchangeController: StockExchangeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StockExchangeController],
      providers: [StockExchangeService],
    }).compile();

    stockExchangeController = app.get<StockExchangeController>(StockExchangeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(stockExchangeController.getHello()).toBe('Hello World!');
    });
  });
});

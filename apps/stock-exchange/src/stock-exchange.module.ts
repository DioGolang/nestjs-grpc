import { Module } from '@nestjs/common';
import { StockExchangeController } from './stock-exchange.controller';
import { StockExchangeService } from './stock-exchange.service';
import { OrdersModule } from './orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/stock-exchange?authSource=admin&directConnection=true',
    ),
    OrdersModule,
  ],
  controllers: [StockExchangeController],
  providers: [StockExchangeService],
})
export class StockExchangeModule {}

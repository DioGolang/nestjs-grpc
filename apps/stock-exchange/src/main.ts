import { NestFactory } from '@nestjs/core';
import { StockExchangeModule } from './stock-exchange.module';

async function bootstrap() {
  const app = await NestFactory.create(StockExchangeModule);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();

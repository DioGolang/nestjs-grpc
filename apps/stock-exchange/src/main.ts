import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { StockExchangeModule } from './stock-exchange.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StockExchangeModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5000',
        package: 'first_grpc',
        protoPath: [join(__dirname, 'orders', 'proto', 'orders.proto')],
        loader: { keepCase: true },
      },
    },
  );
  await app.listen();
}
bootstrap();

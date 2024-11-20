import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Metadata } from '@grpc/grpc-js';
import { lastValueFrom, Observable } from 'rxjs';

enum Status {
  PENDING = 0,
}

type Order = {
  order_id: string;
  account_id: string;
  asset_id: string;
  quantity: number;
  status: string;
};

interface OrderGrpcClient {
  createOrder(
    data: {
      account_id: string;
      asset_id: string;
      quantity: number;
    },
    metadata?: Metadata,
  ): Observable<{ order: Order }>;
  findAllOrders(
    data: { account_id: string },
    metadata?: Metadata,
  ): Observable<{ orders: Order[] }>;
  findOneOrders(
    data: { order_id: string },
    metadata?: Metadata,
  ): Observable<{ order: Order }>;
}

@Injectable()
export class OrdersService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: 'first_grpc',
      protoPath: [join(__dirname, 'orders', 'proto', 'orders.proto')],
      loader: { keepCase: true },
    },
  })
  clientGrpc: ClientGrpc;
  private orderGrpcClient: OrderGrpcClient;

  onModuleInit() {
    this.orderGrpcClient = this.clientGrpc.getService('OrderService');
  }

  async create(createOrderDto: CreateOrderDto) {
    const result = await lastValueFrom(
      this.orderGrpcClient.createOrder(createOrderDto),
    );
    // return { ...result.order, status: Status[result.order.status] };
    return result.order;
  }

  async findAll(account_id: string) {
    const result = await lastValueFrom(
      this.orderGrpcClient.findAllOrders({ account_id }),
    );
    return result.orders;
  }

  async findOne(id: string) {
    const result = await lastValueFrom(
      this.orderGrpcClient.findOneOrders({ order_id: id }),
    );
    return result.order;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
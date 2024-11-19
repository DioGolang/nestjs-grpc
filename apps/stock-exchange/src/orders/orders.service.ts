import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { StatusOrder } from '../enum/status-order.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderModel.create({
      ...createOrderDto,
      status: StatusOrder.PENDING,
    });
  }

  async findAll(account_id: string) {
    return this.orderModel.find({ account_id });
  }

  findOne(id: string) {
    return this.orderModel.findById(id);
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { StatusOrder } from '../../enum/status-order.enum';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  account_id: string;
  @Prop()
  asset_id: string;
  @Prop()
  quantity: number;
  @Prop({ type: String, enum: StatusOrder })
  status: StatusOrder;
}
export const OrderSchema = SchemaFactory.createForClass(Order);

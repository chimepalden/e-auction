import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../../users/schema/user.schema';

export type BidDocument = HydratedDocument<Bid>;
@Schema()
export class Bid {
  @Prop()
  bidId: string;

  @Prop()
  bidAmount: number;

  @Prop()
  productId: string;

  @Prop()
  bidder: User;
}

export const BidSchema = SchemaFactory.createForClass(Bid);

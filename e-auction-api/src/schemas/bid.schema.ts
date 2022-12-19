import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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
  bidder: CreateUserDto;
}

export const BidSchema = SchemaFactory.createForClass(Bid);

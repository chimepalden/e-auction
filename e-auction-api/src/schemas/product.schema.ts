import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  productId: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  detailDescription: string;

  @Prop()
  category: string;

  @Prop()
  startingPrice: number;

  @Prop()
  bidEndDate: Date;

  @Prop()
  bids: string[];

  @Prop()
  sellerId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerController } from './buyer.controller';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { Bid, BidSchema } from '../bids/schema/bid.schema';
import { BidsModule } from '../bids/bids.module';

@Module({
  controllers: [BuyerController],
  providers: [],
  imports: [
    MongooseModule.forFeature([{ name: Bid.name, schema: BidSchema }]),
    ProductsModule,
    UsersModule,
    BidsModule,
  ],
})
export class BuyerModule {}

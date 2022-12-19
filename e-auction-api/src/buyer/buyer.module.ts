import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerController } from './buyer.controller';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { BuyerService } from './buyer.service';
import { Bid, BidSchema } from 'src/schemas/bid.schema';
import { BidsModule } from 'src/bids/bids.module';

@Module({
  controllers: [BuyerController],
  providers: [BuyerService],
  imports: [
    MongooseModule.forFeature([{ name: Bid.name, schema: BidSchema }]),
    ProductsModule,
    UsersModule,
    BidsModule,
  ],
})
export class BuyerModule {}

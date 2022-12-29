import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { BidsModule } from '../bids/bids.module';

@Module({
  controllers: [SellerController],
  providers: [],
  imports: [UsersModule, ProductsModule, BidsModule],
})
export class SellerModule {}

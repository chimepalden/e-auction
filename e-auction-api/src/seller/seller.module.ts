import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { BidsModule } from 'src/bids/bids.module';

@Module({
  controllers: [SellerController],
  providers: [],
  imports: [UsersModule, ProductsModule, BidsModule],
})
export class SellerModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { SellerModule } from './seller/seller.module';
import { BuyerModule } from './buyer/buyer.module';
import { AuthModule } from './auth/auth.module';
import { BidsModule } from './bids/bids.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ProductsModule,
    UsersModule,
    SellerModule,
    BuyerModule,
    AuthModule,
    BidsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

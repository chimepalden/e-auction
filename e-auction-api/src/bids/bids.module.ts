import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bid, BidSchema } from './schema/bid.schema';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { BidsRepository } from './bids.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bid.name, schema: BidSchema }])],
  controllers: [BidsController],
  providers: [BidsService, BidsRepository],
  exports: [BidsService],
})
export class BidsModule {}

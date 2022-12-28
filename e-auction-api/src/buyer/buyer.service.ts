import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBidDto } from '../bids/dto/create-bid.dto';
import { Bid, BidDocument } from '../bids/schema/bid.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { UpdateBidDto } from '../bids/dto/update-bid.dto';

@Injectable()
export class BuyerService {
  constructor(@InjectModel(Bid.name) private bidModel: Model<BidDocument>) {}

  async create(createBidDto: CreateBidDto) {
    return this.bidModel.create({
      bidId: uuidv4(),
      bidAmount: createBidDto.bidAmount,
      productId: createBidDto.productId,
      bidder: createBidDto.bidder,
    });
  }

  async findAll() {
    return this.bidModel.find();
  }

  async update(bidId: string, updateBidDto: UpdateBidDto) {
    return this.bidModel.findOneAndUpdate({ bidId }, updateBidDto);
  }

  async findOne(bidId: string) {
    return this.bidModel.findOne({ bidId });
  }
}

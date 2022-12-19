import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bid, BidDocument } from 'src/schemas/bid.schema';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BidsService {
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

  async findOne(bidId: string) {
    return this.bidModel.findOne({ bidId });
  }
  async update(bidId: string, updateBidDto: UpdateBidDto) {
    console.log(updateBidDto);
    return this.bidModel.findOneAndUpdate({ bidId }, updateBidDto);
  }

  remove(bidId: string) {
    return this.bidModel.findOneAndDelete({ bidId });
  }
}

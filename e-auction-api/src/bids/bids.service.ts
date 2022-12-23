import { Injectable } from '@nestjs/common';
import { Bid } from 'src/schemas/bid.schema';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { v4 as uuidv4 } from 'uuid';
import { BidsRepository } from './bids.repository';

@Injectable()
export class BidsService {
  constructor(private readonly bidsRepository: BidsRepository) {}

  async create(createBidDto: CreateBidDto): Promise<Bid> {
    return this.bidsRepository.create({
      bidId: uuidv4(),
      bidAmount: createBidDto.bidAmount,
      productId: createBidDto.productId,
      bidder: createBidDto.bidder,
    });
  }

  async findAll(): Promise<Bid[]> {
    return this.bidsRepository.find({});
  }

  async findOne(bidId: string): Promise<Bid> {
    return this.bidsRepository.findOne({ bidId });
  }
  async update(bidId: string, updateBidDto: UpdateBidDto): Promise<Bid> {
    console.log(updateBidDto);
    return this.bidsRepository.findOneAndUpdate({ bidId }, updateBidDto);
  }

  async remove(bidId: string): Promise<Bid> {
    return this.bidsRepository.findOneAndDelete({ bidId });
  }
}

import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { Bid, BidDocument } from './schema/bid.schema';

@Injectable()
export class BidsRepository extends EntityRepository<BidDocument> {
  constructor(@InjectModel(Bid.name) bidModel: Model<BidDocument>) {
    super(bidModel);
  }
}

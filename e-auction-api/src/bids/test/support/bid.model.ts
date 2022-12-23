import { Bid } from 'src/bids/schema/bid.schema';
import { MockModel } from '../../../database/test/support/mock.model';
import { bidStub } from '../stubs/bid.stub';

export class BidModel extends MockModel<Bid> {
  protected entityStub = bidStub();
}

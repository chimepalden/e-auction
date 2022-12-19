import { UserModel } from './userModel';

export class BidModel {
  bidId!: string;
  bidAmount!: number;
  productId!: string;
  bidder!: UserModel;
}

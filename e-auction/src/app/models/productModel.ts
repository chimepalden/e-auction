import { BidModel } from './bidModel';

export class ProductModel {
  productId!: string;
  name!: string;
  description!: string;
  detailDescription!: string;
  category!: string;
  startingPrice!: number;
  bidEndDate!: Date;
  bids?: string[];
  sellerId!: string;
}

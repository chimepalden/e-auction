import { BidModel } from '../models/bidModel';

export const bidStub = (): BidModel => {
  return {
    bidId: '0123456789',
    bidAmount: 2000,
    productId: '123456',
    bidder: {
      userId: '12345',
      firstName: 'Sonam',
      lastName: 'Dolma',
      address: {
        line1: '45 oakmount rd',
        line2: 'Apt 1200',
        zip: '11111',
        city: 'Toronto',
        state: 'ON',
      },
      phone: 1234567890,
      email: 'sonam@abc.com',
      products: [],
      badeProducts: [],
      password: '123',
    },
  };
};

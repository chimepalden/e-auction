import { Bid } from '../../../bids/schema/bid.schema';

export const bidStub = (): Bid => {
  return {
    bidId: '1234567890',
    bidAmount: 2000,
    productId: '123456',
    bidder: {
      userId: '12345',
      firstName: 'Chime',
      lastName: 'Palden',
      address: {
        line1: '45 oakmount rd',
        line2: 'Apt 1200',
        zip: '11111',
        city: 'Toronto',
        state: 'ON',
      },
      phone: 1234567890,
      email: 'chime@abc.com',
      products: [],
      badeProducts: [],
      password: '123',
    },
  };
};

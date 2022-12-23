import { Bid } from 'src/bids/schema/bid.schema';

export const bidStub = (): Bid => {
  return {
    bidId: '0123456789',
    bidAmount: 2000,
    productId: '012345678',
    bidder: {
      userId: '01234567',
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
      products: ['0123456', '012345'],
      badeProducts: [],
      password: '123',
    },
  };
};

import { User } from '../../../users/schema/user.schema';

export const userStub = (): User => {
  return {
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
    email: 'palden@abc.com',
    password: '123',
    products: [],
    badeProducts: [],
  };
};

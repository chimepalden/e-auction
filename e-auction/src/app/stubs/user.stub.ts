// objects are passed by reference and if used in different places;
// If the object is mutated by someone, then it could give unexpected results;
// So, instead of exporting the object directly, it is exported as fuction and
// it will return new userStub object that we do not share it between the tests.
import { UserModel } from '../models/userModel';

export const userStub = (): UserModel => {
  return {
    userId: '1234',
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

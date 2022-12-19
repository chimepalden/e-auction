import { CreateUserDto } from 'src/users/dto/create-user.dto';

export const userStub = (): CreateUserDto => {
  return {
    userId: '12345',
    firstName: 'Palden',
    lastName: 'Dolma',
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
  };
};

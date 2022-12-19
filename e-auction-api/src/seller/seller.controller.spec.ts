import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { SellerController } from './seller.controller';
import { Types } from 'mongoose';

describe('SellerController', () => {
  let controller: SellerController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerController],
      providers: [UsersService],
    }).compile();

    controller = module.get<SellerController>(SellerController);
    usersService = module.get<UsersService>(UsersService);
  });

  // describe('findAll', () => {
  //   it('should return an array of users', async () => {
  //     const bidsList = [{ bidAmount: 2000, bidderId: '123456789' }];
  //     const id = new Types.ObjectId("507c7f79bcf86cd7994f6c0e").valueOf();
  //     const result = [{
  //       _id: new Types.ObjectId("507c7f79bcf86cd7994f6c0e").valueOf(),
  //       firstName: 'Palden',
  //       lastName: 'Dolma',
  //       address: {
  //         line1: '45 oakmount rd',
  //         line2: 'Apt 1200',
  //         zip: '11111',
  //         city: 'Toronto',
  //         state: 'ON',
  //       },
  //       phone: '1234567890',
  //       email: 'palden@abc.com',
  //       password: '123',
  //     }];
  //     jest.spyOn(usersService, 'findAll').mockImplementation(() => result);

  //     expect(await controller.getBiddersDetail(bidsList)).toBe(result);
  //   });
  // });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

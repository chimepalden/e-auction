import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../users/users.service';
import { SellerController } from '../../seller.controller';

describe('SellerController', () => {
  let sellersController: SellerController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerController],
      providers: [UsersService],
    }).compile();

    sellersController = module.get<SellerController>(SellerController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });
});

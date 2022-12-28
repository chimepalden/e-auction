import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { UsersController } from '../../users.controller';
import { UsersService } from '../../users.service';
import { userStub } from '../stubs/user.stub';

jest.mock('../../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create method is called', () => {
      let user: CreateUserDto;
      let createUserDto: CreateUserDto;
      beforeEach(async () => {
        createUserDto = {
          userId: userStub().userId,
          firstName: userStub().firstName,
          lastName: userStub().lastName,
          address: userStub().address,
          phone: userStub().phone,
          email: userStub().email,
          password: userStub().password,
        };
        user = await usersController.create(createUserDto);
      });
      test('then it should call usersService', () => {
        expect(usersService.create).toBeCalledWith(createUserDto);
      });

      test('then it should return the user created', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll method is called', () => {
      let users: CreateUserDto[];
      beforeEach(async () => {
        users = await usersController.findAll();
      });
      test('then it should call usersService', () => {
        expect(usersService.findAll).toBeCalled();
      });

      test('then it should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne method is called', () => {
      let user: CreateUserDto;
      beforeEach(async () => {
        user = await usersController.findOne(userStub().userId);
      });
      test('then it should call usersService', () => {
        expect(usersService.findOne).toBeCalledWith(userStub().userId);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findByEmail', () => {
    describe('when findByEmail method is called', () => {
      let user: CreateUserDto;
      beforeEach(async () => {
        user = await usersController.findByEmail(userStub().email);
      });
      test('then it should call usersService', () => {
        expect(usersService.findByEmail).toBeCalledWith(userStub().email);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('update', () => {
    describe('when update method is called', () => {
      let user: CreateUserDto;
      let updateUser: UpdateUserDto;

      beforeEach(async () => {
        updateUser = {
          firstName: 'Sonam',
          lastName: 'Dolma',
        };
        user = await usersController.update(userStub().userId, updateUser);
      });

      test('then it should call usersService', () => {
        expect(usersService.update).toBeCalledWith(
          userStub().userId,
          updateUser,
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove method is called', () => {
      let user: CreateUserDto;
      beforeEach(async () => {
        user = await usersController.remove(userStub().userId);
      });
      test('then it should call usersService', () => {
        expect(usersService.remove).toBeCalledWith(userStub().userId);
      });

      test('then it should return the deleted user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});

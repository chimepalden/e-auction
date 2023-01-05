import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from '../../schema/user.schema';
import { UsersRepository } from '../../users.repository';
import { UsersService } from '../../users.service';
import { userStub } from '../stubs/user.stub';

jest.mock('../../users.repository');
jest.mock('uuid', () => ({ v4: () => '12345' }));

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    describe('when findAll method is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersService.findAll();
      });

      test('it should call users repository', () => {
        expect(usersRepository.find).toBeCalled();
      });
      test('then, it should return a list of users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('create', () => {
    describe('when create method is called', () => {
      let createUser: CreateUserDto;
      let user: User;

      beforeEach(async () => {
        createUser = userStub();
        user = await usersService.create(createUser);
      });

      test('it should call users repository', () => {
        expect(usersRepository.create).toBeCalledWith(createUser);
      });

      test('then, it should return the user created', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne method is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await usersService.findOne(userStub().userId);
      });

      test('it should call users repository', () => {
        expect(usersRepository.findOne).toBeCalledWith({
          userId: userStub().userId,
        });
      });
      test('it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findByEmail', () => {
    describe('when findByEmail method is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await usersService.findByEmail(userStub().email);
      });

      test('it should call users repository', () => {
        expect(usersRepository.findOne).toBeCalledWith({
          email: userStub().email,
        });
      });
      test('it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('update', () => {
    describe('when update method is called', () => {
      let updateUser: UpdateUserDto;
      let user: User;

      beforeEach(async () => {
        updateUser = {
          firstName: 'Sonam',
        };
        user = await usersService.update(userStub().userId, updateUser);
      });

      test('It should call users repository', () => {
        expect(usersRepository.findOneAndUpdate).toBeCalledWith(
          { userId: userStub().userId },
          updateUser,
        );
      });
      test('then, it should return the updated user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove method is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersService.remove(userStub().userId);
      });

      test('It should call users repository', () => {
        expect(usersRepository.findOneAndDelete).toBeCalledWith({
          userId: userStub().userId,
        });
      });
      test('then, it should return the deleted user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});

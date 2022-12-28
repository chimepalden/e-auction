import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../schema/user.schema';
import { UsersRepository } from '../../users.repository';
import { userStub } from '../stubs/user.stub';
import { UserModel } from '../support/user.model';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let userModel: UserModel;
  let userFilterQuery: FilterQuery<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getModelToken(User.name),
          useClass: UserModel,
        },
      ],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
    userModel = module.get<UserModel>(getModelToken(User.name));

    userFilterQuery = {
      userId: userStub().userId,
    };

    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create method is called', () => {
      let user: User;
      let createUser: CreateUserDto;

      beforeEach(async () => {
        createUser = {
          userId: userStub().userId,
          firstName: userStub().firstName,
          lastName: userStub().lastName,
          address: userStub().address,
          phone: userStub().phone,
          email: userStub().email,
          password: userStub().password,
        };

        jest.spyOn(userModel, 'create');
        user = await repository.create(createUser);
      });

      test('then it should call the userModel', () => {
        expect(userModel.create).toBeCalledWith(createUser);
      });
      test('then it should return the user created', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('find', () => {
    describe('when find method is called', () => {
      let users: User[];

      beforeEach(async () => {
        jest.spyOn(userModel, 'find');
        users = await repository.find(userFilterQuery);
      });

      test('then it should call the userModel', () => {
        expect(userModel.find).toBeCalledWith(userFilterQuery);
      });

      test('then it should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne method is called', () => {
      let user: User;

      beforeEach(async () => {
        jest.spyOn(userModel, 'findOne');
        user = await repository.findOne(userFilterQuery);
      });

      test('then it should call the userModel', () => {
        expect(userModel.findOne).toBeCalledWith(userFilterQuery, {
          _id: 0,
          _v: 0,
        });
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findOneAndUpdate', () => {
    describe('when findOneAndUpdate method is called', () => {
      let user: User;
      let updateUser: UpdateUserDto;

      beforeEach(async () => {
        updateUser = {
          firstName: 'Sonam',
          lastName: 'Dolma',
        };
        jest.spyOn(userModel, 'findOneAndUpdate');
        user = await repository.findOneAndUpdate(userFilterQuery, updateUser);
      });

      test('then it should call the userModel', () => {
        expect(userModel.findOneAndUpdate).toBeCalledWith(
          userFilterQuery,
          updateUser,
          { new: true },
        );
      });

      test('then it should return the updated user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findOneAndDelete', () => {
    describe('when findOneAndDelete method is called', () => {
      let user: User;

      beforeEach(async () => {
        jest.spyOn(userModel, 'findOneAndDelete');
        user = await repository.findOneAndDelete(userFilterQuery);
      });

      test('then it should call the userModel', () => {
        expect(userModel.findOneAndDelete).toBeCalledWith(userFilterQuery);
      });

      test('then it should return the deleted user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});

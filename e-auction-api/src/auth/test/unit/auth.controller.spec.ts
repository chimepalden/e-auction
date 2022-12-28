import { Test, TestingModule } from '@nestjs/testing';
import { userStub } from '../stubs/user.stub';
import { AuthController } from '../../auth.controller';
import { AuthService } from '../../auth.service';
import { LoginDto } from '../../dto/login.dto';
import { LocalStrategy } from '../../local.strategy';
import { User } from '../../../users/schema/user.schema';

jest.mock('../../auth.service');

describe('AuthController', () => {
  let controller: AuthController;
  let localStrategy: LocalStrategy;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('login', () => {
    describe('when login method is called', () => {
      let result: any;
      let localResponse: User;
      let loginCredentials: LoginDto;

      beforeEach(async () => {
        loginCredentials = {
          email: userStub().email,
          password: userStub().password,
        };

        localResponse = await localStrategy.validate(
          loginCredentials.email,
          loginCredentials.password,
        );
        result = await controller.login(localResponse);
      });

      test('then local strategy should call auth service', () => {
        expect(service.validateUser).toBeCalledWith(
          loginCredentials.email,
          loginCredentials.password,
        );
      });

      test('then it should return a user on authorization', () => {
        expect(localResponse).toEqual(userStub());
      });

      test('then it should return userId and token on login', () => {
        expect(result).toEqual({
          access_token: 'token',
          user_id: userStub().userId,
        });
      });
    });
  });
});

import { userStub } from '../test/stubs/user.stub';

export const AuthService = jest.fn().mockReturnValue({
  validateUser: jest.fn().mockResolvedValue(userStub()),
  login: jest
    .fn()
    .mockResolvedValue({ access_token: 'token', user_id: userStub().userId }),
});

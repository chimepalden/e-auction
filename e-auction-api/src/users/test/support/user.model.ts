import { MockModel } from '../../../database/test/support/mock.model';
import { User } from 'src/users/schema/user.schema';
import { userStub } from '../stubs/user.stub';

export class UserModel extends MockModel<User> {
  protected entityStub = userStub();
}

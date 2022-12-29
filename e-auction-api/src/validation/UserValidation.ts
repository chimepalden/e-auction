import { InjectModel } from '@nestjs/mongoose';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schema/user.schema';

@ValidatorConstraint({ async: true })
export class UserValidation implements ValidatorConstraintInterface {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  validate(userId: string) {
    return this.userModel.findById(userId).then((user) => {
      return user !== undefined;
    });
  }

  defaultMessage(): string {
    return 'user id does not exist';
  }
}

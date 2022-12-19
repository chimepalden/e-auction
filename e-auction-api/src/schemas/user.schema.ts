import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateAddressDto } from 'src/users/dto/create-address.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  userId: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  address: CreateAddressDto;

  @Prop()
  phone: number;

  @Prop()
  email: string;

  @Prop()
  products: string[];

  @Prop()
  badeProducts: string[];

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

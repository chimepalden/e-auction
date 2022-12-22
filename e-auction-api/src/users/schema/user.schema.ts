import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateAddressDto } from '../dto/create-address.dto';

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
  password: string;

  @Prop([String])
  products: string[];

  @Prop([String])
  badeProducts: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

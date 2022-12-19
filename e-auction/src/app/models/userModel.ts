import { AddressModel } from './addressModel';

export class UserModel {
  userId!: string;
  firstName!: string;
  lastName!: string;
  address!: AddressModel;
  phone!: number;
  email!: string;
  password!: string;
  products?: string[];
  badeProducts?: string[];
}

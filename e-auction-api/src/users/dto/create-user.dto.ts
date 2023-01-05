import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateUserDto {
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  lastName: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmptyObject()
  address: CreateAddressDto;

  @IsNotEmpty()
  @IsNumberString()
  @Length(10, 10)
  phone: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  products?: string[];

  @IsOptional()
  badeProducts?: string[];
}

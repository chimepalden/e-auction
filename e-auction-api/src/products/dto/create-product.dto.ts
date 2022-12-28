import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { BidEndDateValidation } from '../../validation/BidEndDateValidaton';
import { Category } from '../category';

export class CreateProductDto {
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  name: string;

  description: string;

  detailDescription: string;

  @IsEnum(Object.keys(Category))
  @IsNotEmpty()
  category: string;

  @IsNumberString()
  @IsNotEmpty()
  startingPrice: number;

  @Type(() => Date)
  @IsDate()
  @Validate(BidEndDateValidation)
  bidEndDate: Date;

  bids?: string[];

  @IsNotEmpty()
  @IsString()
  sellerId: string;
}

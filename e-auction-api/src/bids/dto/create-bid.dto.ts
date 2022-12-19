import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateBidDto {
  bidId: string;

  @IsNotEmpty()
  bidAmount: number;

  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  bidder: CreateUserDto;
}

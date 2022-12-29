import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseFilters,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BidsService } from '../bids/bids.service';
import { BadedException } from '../exceptions/BadedException';
import { BadedExceptionFilter } from '../exceptions/BadedExceptionFilter';
import { BidEndDatePassedException } from '../exceptions/BidEndDatePassedException';
import { BidEndDatePassedExceptionFilter } from '../exceptions/BidEndDatePassedExceptionFilter';
import { IdException } from '../exceptions/IdException';
import { IdExceptionFilter } from '../exceptions/IdExceptionFilter';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { CreateBidDto } from '../bids/dto/create-bid.dto';
import { UpdateBidDto } from '../bids/dto/update-bid.dto';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';

@Controller('buyer')
export class BuyerController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
    private readonly bidsService: BidsService,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('place-bid')
  @UseFilters(
    IdExceptionFilter,
    BidEndDatePassedExceptionFilter,
    BadedExceptionFilter,
  )
  async createBid(@Body() createBidDto: CreateBidDto) {
    let product: UpdateProductDto;
    try {
      product = await this.productsService.findOne(createBidDto.productId);
    } catch (error) {
      console.log(error);
      throw new IdException();
    }

    product.bids.forEach((id) => {
      if (id === createBidDto.bidder.userId) throw new BadedException();
    });

    if (product.bidEndDate < new Date()) {
      throw new BidEndDatePassedException();
    }

    try {
      return this.bidsService.create(createBidDto).then((res) => {
        product.bids.push(res.bidId);
        createBidDto.bidder.badeProducts.push(res.productId);
        this.productsService.update(createBidDto.productId, product);
        this.usersService.update(createBidDto.bidder.userId, {
          badeProducts: createBidDto.bidder.badeProducts,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Patch('update-bid/:productId/:bidId/:newBidAmount')
  @UseFilters(
    IdExceptionFilter,
    BidEndDatePassedExceptionFilter,
    BadedExceptionFilter,
  )
  async updateProductBid(@Param() params: Record<string, any>) {
    let product: any;
    try {
      product = await this.productsService.findOne(params.productId);
    } catch (error) {
      console.log(error);
    }
    if (product.bidEndDate < new Date()) {
      throw new BidEndDatePassedException();
    }

    return this.bidsService.update(params.bidId, {
      bidAmount: params.newBidAmount,
    });
  }

  @Get(':id')
  async getBuyerDetail(@Param('id') buyerId: string) {
    const productList: UpdateProductDto[] = [];
    let bidList: UpdateBidDto[] = [];
    const buyer = await this.usersService.findOne(buyerId);
    const allProducts = await this.productsService.findAll();

    if (buyer.badeProducts) {
      buyer.badeProducts.forEach((item) => {
        for (let product of allProducts) {
          if (item === product.productId) {
            productList.push(product);
            break;
          }
        }
      });

      bidList = (await this.bidsService.findAll()).filter(
        (bid) => bid.bidder.userId === buyerId,
      );
    }
    return { productList, bidList };
  }
}

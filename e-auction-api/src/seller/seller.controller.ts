import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseFilters,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from '../products/products.service';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UsersService } from '../users/users.service';
import { BidsService } from '../bids/bids.service';
import { BidEndDatePassedException } from '../exceptions/BidEndDatePassedException';
import { BidEndDatePassedExceptionFilter } from '../exceptions/BidEndDatePassedExceptionFilter';
import { ProductHasBuyerException } from '../exceptions/ProductHasBuyerException';
import { ProductHasBuyerExceptionFilter } from '../exceptions/ProductHasBuyerExceptionFilter';
import { Bid } from '../bids/schema/bid.schema';
import { User } from '../users/schema/user.schema';
import { Product } from '../products/schema/product.schema';

@Controller('seller')
export class SellerController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
    private readonly bidsService: BidsService,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<User> {
    const product = await this.productsService.create(createProductDto);
    const user = await this.usersService.findOne(createProductDto.sellerId);
    user.products.push(product.productId);
    return this.usersService.update(createProductDto.sellerId, user);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getSellerProducts(@Param('id') sellerId: string): Promise<Product[]> {
    const allProducts = await this.productsService.findAll();
    const sellerProducts = allProducts.filter(
      (product) => sellerId === product.sellerId,
    );
    return sellerProducts;
  }

  @Get()
  async getBiddersDetailList(
    @Headers('myHeader') headers: string,
  ): Promise<Bid[]> {
    const productBiddersDetailList: Bid[] = [];

    // if (headers) {
    const list = headers.split(',');
    const allBids = await this.bidsService.findAll();
    list.forEach((bidId) => {
      for (let bid of allBids) {
        if (bidId == bid.bidId) {
          productBiddersDetailList.push(bid);
          break;
        }
      }
    });
    return productBiddersDetailList;
  }

  @Delete(':id')
  @UseFilters(BidEndDatePassedExceptionFilter, ProductHasBuyerExceptionFilter)
  async removeSellerProduct(@Param('id') productId: string): Promise<Product> {
    const product = await this.productsService.findOne(productId);
    const now = new Date();
    if (product.bidEndDate <= now) {
      throw new BidEndDatePassedException();
    } else if (product.bids.length !== 0) {
      throw new ProductHasBuyerException();
    } else return this.productsService.remove(productId);
  }
}

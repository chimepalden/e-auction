import { Test, TestingModule } from '@nestjs/testing';
import { BuyerController } from '../../buyer.controller';
import { UsersService } from '../../../users/users.service';
import { ProductsService } from '../../../products/products.service';
import { BidsService } from '../../../bids/bids.service';
import { userStub } from '../stubs/user.stub';
import { bidStub } from '../stubs/bid.stub';
import { productStub } from '../stubs/product.stub';
import { CreateBidDto } from '../../../bids/dto/create-bid.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { Bid } from '../../../bids/schema/bid.schema';
import { Product } from '../../../products/schema/product.schema';
import { User } from '../../../users/schema/user.schema';

describe('BuyerController', () => {
  let buyerController: BuyerController;
  let usersService: UsersService;
  let productsService: ProductsService;
  let bidsService: BidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyerController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(userStub()),
            findAll: jest.fn().mockResolvedValue([userStub()]),
            findOne: jest.fn().mockResolvedValue(userStub()),
            findByEmail: jest.fn().mockResolvedValue(userStub()),
            update: jest.fn().mockResolvedValue(userStub()),
            remove: jest.fn().mockResolvedValue(userStub()),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn().mockResolvedValue(productStub()),
            findAll: jest.fn().mockResolvedValue([productStub()]),
            findOne: jest.fn().mockResolvedValue(productStub()),
            update: jest.fn().mockResolvedValue(productStub()),
            remove: jest.fn().mockResolvedValue(productStub()),
          },
        },
        {
          provide: BidsService,
          useValue: {
            create: jest.fn().mockResolvedValue(bidStub()),
            findAll: jest.fn().mockResolvedValue([bidStub()]),
            findOne: jest.fn().mockResolvedValue(bidStub()),
            update: jest.fn().mockResolvedValue(bidStub()),
            remove: jest.fn().mockResolvedValue(bidStub()),
          },
        },
      ],
    }).compile();

    buyerController = module.get<BuyerController>(BuyerController);
    usersService = module.get<UsersService>(UsersService);
    bidsService = module.get<BidsService>(BidsService);
    productsService = module.get<ProductsService>(ProductsService);

    jest.clearAllMocks();
  });

  describe('createBid', () => {
    describe('when createBid method is called', () => {
      let bid: Bid;
      let createBidDto: CreateBidDto;
      let updateProductDto: UpdateProductDto;

      beforeEach(async () => {
        createBidDto = bidStub();
        bid = await buyerController.createBid(createBidDto);
      });

      test('it should call product service to find the product to bid for', () => {
        expect(productsService.findOne).toHaveBeenCalledWith(
          createBidDto.productId,
        );
      });

      test('then, it should call bidsService to create bid if all conditions were met', () => {
        expect(bidsService.create).toBeCalledWith(createBidDto);
      });

      test('then, it should call productsService to update products bid list', () => {
        updateProductDto = productStub();
        updateProductDto.bids.push(bid.bidId);
        expect(productsService.update).toBeCalledWith(
          bid.productId,
          updateProductDto,
        );
      });

      test('then, it should call usersService to update users bade list', () => {
        createBidDto.bidder.badeProducts.push(bid.productId);
        expect(usersService.update).toBeCalledWith(bid.bidder.userId, {
          badeProducts: createBidDto.bidder.badeProducts,
        });
      });
    });
  });

  describe('updateProductBid', () => {
    describe('when updateProductBid method is called', () => {
      let bid: Bid;
      const params: Record<string, any> = {
        productId: 123456,
        bidId: 1234567890,
        newBidAmount: 3000,
      };

      beforeEach(async () => {
        bid = await buyerController.updateProductBid(params);
      });

      test('it should call productsService to get the product', () => {
        expect(productsService.findOne).toBeCalledWith(params.productId);
      });

      test('it should call bidsService to update the bid for the product', () => {
        expect(bidsService.update).toBeCalledWith(params.bidId, {
          bidAmount: params.newBidAmount,
        });
        expect(bid.bidAmount).toEqual(bidStub().bidAmount);
      });
    });
  });

  describe('getBuyerDetail', () => {
    describe('when getBuyerDetail method is called', () => {
      let buyer: User;
      let product: Product;
      let bid: Bid;
      let productList: Product[] = [];
      let bidList: Bid[] = [];
      let buyerProductListBidList: {};

      beforeEach(async () => {
        buyerProductListBidList = await buyerController.getBuyerDetail(
          userStub().userId,
        );
      });

      test('it should call usersService to find the buyer', () => {
        expect(usersService.findOne).toBeCalledWith(userStub().userId);
      });

      test('then, it should call productsService to get all the products', () => {
        expect(productsService.findAll).toBeCalled();
      });

      test('then, it should call bidsService to get buyers products and bids', () => {
        buyer = userStub();
        buyer.badeProducts.push(productStub().productId);
        product = productStub();
        product.bids.push(bidStub().bidId);
        productList.push(product);
        bid = bidStub();
        bidList.push(bid);
        // expect(productsService.findAll).toHaveBeenCalled();
        expect(bidsService.findAll).toHaveBeenCalled();
        // expect(buyerProductListBidList).toEqual({ productList, bidList });
      });
    });
  });
});

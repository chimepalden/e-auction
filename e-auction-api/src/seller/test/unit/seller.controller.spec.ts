import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../users/users.service';
import { ProductsService } from '../../../products/products.service';
import { BidsService } from '../../../bids/bids.service';
import { SellerController } from '../../seller.controller';
import { CreateProductDto } from '../../../products/dto/create-product.dto';
import { bidStub } from '../../test/stubs/bid.stub';
import { userStub } from '../../test/stubs/user.stub';
import { productStub } from '../../test/stubs/product.stub';
import { User } from '../../../users/schema/user.schema';
import { Product } from '../../../products/schema/product.schema';
import { Bid } from '../../../bids/schema/bid.schema';

describe('SellerController', () => {
  let sellerController: SellerController;
  let usersService: UsersService;
  let productsService: ProductsService;
  let bidsService: BidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerController],
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

    sellerController = module.get<SellerController>(SellerController);
    usersService = module.get<UsersService>(UsersService);
    productsService = module.get<ProductsService>(ProductsService);
    bidsService = module.get<BidsService>(BidsService);

    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    describe('when createProduct method is called', () => {
      let createProduct: CreateProductDto;
      let user: User;

      beforeEach(async () => {
        createProduct = productStub();
        user = await sellerController.createProduct(createProduct);
        user.products.push(createProduct.productId);
      });

      test('then it should call products service', () => {
        expect(productsService.create).toBeCalledWith(createProduct);
      });
      test('then it should call users service to get user detail', () => {
        expect(usersService.findOne).toBeCalledWith(createProduct.sellerId);
      });
      test('then it should call users service to update user', () => {
        expect(usersService.update).toBeCalledWith(
          createProduct.sellerId,
          user,
        );
      });
    });
  });

  describe('getSellerProducts', () => {
    describe('when getSellerProducts method is called', () => {
      let products: Product[];
      beforeEach(async () => {
        products = await sellerController.getSellerProducts(userStub().userId);
      });

      test('then it should call product service to get all products', () => {
        expect(productsService.findAll).toBeCalled();
      });
      // test('then products return should belong to the seller', () => {
      //   expect(products[0].sellerId).toEqual(userStub().userId);
      // });
    });
  });

  describe('getBiddersDetailList', () => {
    describe('when getBiddersDetailList method is called', () => {
      let productBiddersDetailList: Bid[];
      let bidsIdsHeaderString = '';

      beforeEach(async () => {
        productBiddersDetailList = await sellerController.getBiddersDetailList(
          bidsIdsHeaderString,
        );
      });

      test('then it should call bid service to get all bids', () => {
        expect(bidsService.findAll).toBeCalled();
      });
    });
  });

  describe('removeSellerProduct', () => {
    describe('when removeSellerProduct method is called', () => {
      let removedProduct: Product;
      beforeEach(async () => {
        removedProduct = await sellerController.removeSellerProduct(
          productStub().productId,
        );
      });

      test('it should called product service', () => {
        expect(productsService.findOne).toBeCalledWith(productStub().productId);
      });

      test('it should call product service to remove if all conditions were met', () => {
        expect(productsService.remove).toHaveBeenLastCalledWith(
          productStub().productId,
        );
      });

      test('it should return the removed product', () => {
        expect(removedProduct).toEqual(productStub());
      });
    });
  });
});

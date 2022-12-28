import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { ProductsController } from '../../products.controller';
import { ProductsService } from '../../products.service';
import { productStub } from '../stubs/product.stub';

jest.mock('../../products.service');

describe('ProductsController', () => {
  let productController: ProductsController;
  let productService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    productController = module.get<ProductsController>(ProductsController);
    productService = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create method is called', () => {
      let product: CreateProductDto;
      let createProductDto: CreateProductDto;
      beforeEach(async () => {
        createProductDto = {
          productId: productStub().productId,
          name: productStub().name,
          description: productStub().description,
          detailDescription: productStub().detailDescription,
          category: productStub().category,
          startingPrice: productStub().startingPrice,
          bidEndDate: productStub().bidEndDate,
          sellerId: productStub().sellerId,
        };
        product = await productController.create(createProductDto);
      });
      test('then it should call products Service', () => {
        expect(productService.create).toBeCalledWith(createProductDto);
      });

      test('then it should return the product created', () => {
        expect(product).toEqual(productStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll method is called', () => {
      let products: CreateProductDto[];
      beforeEach(async () => {
        products = await productController.findAll();
      });
      test('then it should call products Service', () => {
        expect(productService.findAll).toBeCalled();
      });

      test('then it should return products', () => {
        expect(products).toEqual([productStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne method is called', () => {
      let product: CreateProductDto;
      beforeEach(async () => {
        product = await productController.findOne(productStub().productId);
      });
      test('then it should call products Service', () => {
        expect(productService.findOne).toBeCalledWith(productStub().productId);
      });

      test('then it should return a product', () => {
        expect(product).toEqual(productStub());
      });
    });
  });

  describe('update', () => {
    describe('when update method is called', () => {
      let product: CreateProductDto;
      let updateProduct: UpdateProductDto;

      beforeEach(async () => {
        updateProduct = {
          category: 'Painting',
          startingPrice: 2000,
        };
        product = await productController.update(
          productStub().productId,
          updateProduct,
        );
      });

      test('then it should call product Service', () => {
        expect(productService.update).toBeCalledWith(
          productStub().productId,
          updateProduct,
        );
      });

      test('then it should return the product', () => {
        expect(product).toEqual(productStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove method is called', () => {
      let product: CreateProductDto;
      beforeEach(async () => {
        product = await productController.remove(productStub().productId);
      });
      test('then it should call product Service', () => {
        expect(productService.remove).toBeCalledWith(productStub().productId);
      });

      test('then it should return the deleted product', () => {
        expect(product).toEqual(productStub());
      });
    });
  });
});

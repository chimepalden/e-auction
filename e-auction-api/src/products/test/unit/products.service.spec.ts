import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from '../../products.repository';
import { Product } from '../../schema/product.schema';
import { ProductsService } from '../../products.service';
import { productStub } from '../stubs/product.stub';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

jest.mock('../../products.repository');
jest.mock('uuid', () => ({ v4: () => '123456' }));

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productsRepository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, ProductsRepository],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    describe('when findAll method is called', () => {
      let products: Product[];

      beforeEach(async () => {
        products = await productsService.findAll();
      });

      test('it should call products repository', () => {
        expect(productsRepository.find).toBeCalled();
      });
      test('then, it should return a list of products', () => {
        expect(products).toEqual([productStub()]);
      });
    });
  });

  describe('create', () => {
    describe('when create method is called', () => {
      let createProduct: CreateProductDto;
      let product: Product;

      beforeEach(async () => {
        createProduct = productStub();
        product = await productsService.create(createProduct);
      });

      test('it should call products repository', () => {
        expect(productsRepository.create).toBeCalledWith(createProduct);
      });
      test('then, it should return the product created', () => {
        expect(product).toEqual(productStub());
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne method is called', () => {
      let product: Product;
      beforeEach(async () => {
        product = await productsService.findOne(productStub().productId);
      });

      test('it should call products repository', () => {
        expect(productsRepository.findOne).toBeCalledWith({
          productId: productStub().productId,
        });
      });
      test('it should return a product', () => {
        expect(product).toEqual(productStub());
      });
    });
  });

  describe('update', () => {
    describe('when update method is called', () => {
      let updateProduct: UpdateProductDto;
      let product: Product;

      beforeEach(async () => {
        updateProduct = {
          startingPrice: 3300,
        };
        product = await productsService.update(
          productStub().productId,
          updateProduct,
        );
      });

      test('It should call products repository', () => {
        expect(productsRepository.findOneAndUpdate).toBeCalledWith(
          { productId: productStub().productId },
          updateProduct,
        );
      });
      test('then, it should return the updated product', () => {
        expect(product).toEqual(productStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove method is called', () => {
      let product: Product;

      beforeEach(async () => {
        product = await productsService.remove(productStub().productId);
      });

      test('It should call products repository', () => {
        expect(productsRepository.findOneAndDelete).toBeCalledWith({
          productId: productStub().productId,
        });
      });
      test('then, it should return the deleted product', () => {
        expect(product).toEqual(productStub());
      });
    });
  });
});

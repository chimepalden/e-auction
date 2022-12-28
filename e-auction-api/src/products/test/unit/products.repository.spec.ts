import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { CreateProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { Product } from '../../schema/product.schema';
import { ProductsRepository } from '../../products.repository';
import { productStub } from '../stubs/product.stub';
import { ProductModel } from '../support/product.model';

describe('ProductsRepository', () => {
  let repository: ProductsRepository;
  let productModel: ProductModel;
  let productFilterQuery: FilterQuery<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsRepository,
        {
          provide: getModelToken(Product.name),
          useClass: ProductModel,
        },
      ],
    }).compile();

    repository = module.get<ProductsRepository>(ProductsRepository);
    productModel = module.get<ProductModel>(getModelToken(Product.name));

    productFilterQuery = {
      productId: productStub().productId,
    };

    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create method is called', () => {
      let product: Product;
      let createProduct: CreateProductDto;

      beforeEach(async () => {
        createProduct = {
          productId: productStub().productId,
          name: productStub().name,
          description: productStub().description,
          detailDescription: productStub().detailDescription,
          category: productStub().category,
          startingPrice: productStub().startingPrice,
          bidEndDate: productStub().bidEndDate,
          sellerId: productStub().sellerId,
        };

        jest.spyOn(productModel, 'create');
        product = await repository.create(createProduct);
      });

      test('then it should call the productModel', () => {
        expect(productModel.create).toBeCalledWith(createProduct);
      });
      test('then it should return the product created', () => {
        expect(product).toEqual(productStub());
      });
    });
  });

  describe('find', () => {
    describe('when find method is called', () => {
      let products: Product[];

      beforeEach(async () => {
        jest.spyOn(productModel, 'find');
        products = await repository.find(productFilterQuery);
      });

      test('then it should call the productModel', () => {
        expect(productModel.find).toBeCalledWith(productFilterQuery);
      });
      test('then it should return products', () => {
        expect(products).toEqual([productStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne method is called', () => {
      let product: Product;

      beforeEach(async () => {
        jest.spyOn(productModel, 'findOne');
        product = await repository.findOne(productFilterQuery);
      });

      test('then it should call the productModel', () => {
        expect(productModel.findOne).toBeCalledWith(productFilterQuery, {
          _id: 0,
          _v: 0,
        });
      });
      test('then it should return a product', () => {
        expect(product).toEqual(productStub());
      });
    });
  });

  describe('findOneAndUpdate', () => {
    describe('when findOneAndUpdate method is called', () => {
      let product: Product;
      let updateProduct: UpdateProductDto;

      beforeEach(async () => {
        updateProduct = {
          name: 'This is updated name',
        };
        jest.spyOn(productModel, 'findOneAndUpdate');
        product = await repository.findOneAndUpdate(
          productFilterQuery,
          updateProduct,
        );
      });

      test('then it should call the productModel', () => {
        expect(productModel.findOneAndUpdate).toBeCalledWith(
          productFilterQuery,
          updateProduct,
          { new: true },
        );
      });

      test('then it should return the updated product', () => {
        expect(product).toEqual(productStub());
      });
    });
  });

  describe('findOneAndDelete', () => {
    describe('when findOneAndDelete method is called', () => {
      let product: Product;

      beforeEach(async () => {
        jest.spyOn(productModel, 'findOneAndDelete');
        product = await repository.findOneAndDelete(productFilterQuery);
      });

      test('then it should call the productModel', () => {
        expect(productModel.findOneAndDelete).toBeCalledWith(
          productFilterQuery,
        );
      });
      test('then it should return the deleted product', () => {
        expect(product).toEqual(productStub());
      });
    });
  });
});

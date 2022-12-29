import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import { productStub } from '../stubs/product.stub';
import * as request from 'supertest';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

describe('ProductsController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    dbConnection = module.get<DatabaseService>(DatabaseService).getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('products').deleteMany({});
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      await dbConnection.collection('products').insertOne(productStub());
      const response = await request(httpServer).get('/products');

      expect(response.status).toBe(200);
      //   expect(response.body).toMatchObject([productStub()]);
    }, 30000);
  });

  describe('create', () => {
    it('It should create a product', async () => {
      let createProduct: CreateProductDto = productStub();

      const response = await request(httpServer)
        .post('/products')
        .send(createProduct);

      expect(response.status).toBe(201);
      expect(response.body.sellerId).toEqual(createProduct.sellerId);

      const product = await dbConnection
        .collection('products')
        .findOne({ productId: response.body.productId });

      expect(product.productId).toEqual(response.body.productId);
    });
  });

  describe('update', () => {
    it('It should update a product', async () => {
      let updateProduct: UpdateProductDto = {
        startingPrice: 2000,
      };
      await dbConnection.collection('products').insertOne(productStub());
      const response = await request(httpServer)
        .patch(`/products/${productStub().productId}`)
        .send(updateProduct);

      expect(response.ok);
      expect(response.body.productId).toEqual(productStub().productId);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      await dbConnection.collection('products').insertOne(productStub());
      const response = await request(httpServer)
        .get('/products')
        .query({ id: productStub().productId });

      expect(response.status).toBe(200);
      expect(response.body[0].productId).toEqual(productStub().productId);
    });
  });

  describe('remove', () => {
    it('should return the product removed', async () => {
      await dbConnection.collection('products').insertOne(productStub());
      const response = await request(httpServer).delete(
        `/products/${productStub().productId}`,
      );

      expect(response.ok);
      expect(response.body.productId).toEqual(productStub().productId);
    });
  });
});

import { productStub } from '../test/stubs/product.stub';

export const ProductsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(productStub()),
  findAll: jest.fn().mockResolvedValue([productStub()]),
  findOne: jest.fn().mockResolvedValue(productStub()),
  update: jest.fn().mockResolvedValue(productStub()),
  remove: jest.fn().mockResolvedValue(productStub()),
});

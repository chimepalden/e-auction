import { productStub } from '../test/stubs/product.stub';

export const ProductsRepository = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(productStub()),
  find: jest.fn().mockResolvedValue([productStub()]),
  findOne: jest.fn().mockResolvedValue(productStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(productStub()),
  findOneAndDelete: jest.fn().mockResolvedValue(productStub()),
});

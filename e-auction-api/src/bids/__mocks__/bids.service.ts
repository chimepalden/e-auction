import { bidStub } from '../test/stubs/bid.stub';

export const BidsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(bidStub()),
  findAll: jest.fn().mockResolvedValue([bidStub()]),
  findOne: jest.fn().mockResolvedValue(bidStub()),
  update: jest.fn().mockResolvedValue(bidStub()),
  remove: jest.fn().mockResolvedValue(bidStub()),
});

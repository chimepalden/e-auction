import { bidStub } from '../test/stubs/bid.stub';

export const BidsRepository = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(bidStub()),
  find: jest.fn().mockResolvedValue([bidStub()]),
  findOne: jest.fn().mockResolvedValue(bidStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(bidStub()),
  findOneAndDelete: jest.fn().mockResolvedValue(bidStub()),
});

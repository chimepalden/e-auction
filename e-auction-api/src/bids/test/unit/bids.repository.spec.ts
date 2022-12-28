import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { CreateBidDto } from '../../dto/create-bid.dto';
import { UpdateBidDto } from '../../dto/update-bid.dto';
import { Bid } from '../../schema/bid.schema';
import { BidsRepository } from '../../bids.repository';
import { bidStub } from '../stubs/bid.stub';
import { BidModel } from '../support/bid.model';

describe('ProductsRepository', () => {
  let repository: BidsRepository;
  let bidModel: BidModel;
  let bidFilterQuery: FilterQuery<Bid>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BidsRepository,
        {
          provide: getModelToken(Bid.name),
          useClass: BidModel,
        },
      ],
    }).compile();

    repository = module.get<BidsRepository>(BidsRepository);
    bidModel = module.get<BidModel>(getModelToken(Bid.name));

    bidFilterQuery = {
      productId: bidStub().bidId,
    };

    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create method is called', () => {
      let bid: Bid;
      let createBid: CreateBidDto;

      beforeEach(async () => {
        createBid = {
          bidId: bidStub().bidId,
          productId: bidStub().productId,
          bidAmount: bidStub().bidAmount,
          bidder: bidStub().bidder,
        };

        jest.spyOn(bidModel, 'create');
        bid = await repository.create(createBid);
      });

      test('then it should call the bidModel', () => {
        expect(bidModel.create).toBeCalledWith(createBid);
      });
      test('then it should return the bid created', () => {
        expect(bid).toEqual(bidStub());
      });
    });
  });

  describe('find', () => {
    describe('when find method is called', () => {
      let bids: Bid[];

      beforeEach(async () => {
        jest.spyOn(bidModel, 'find');
        bids = await repository.find(bidFilterQuery);
      });

      test('then it should call the bidModel', () => {
        expect(bidModel.find).toBeCalledWith(bidFilterQuery);
      });
      test('then it should return bids', () => {
        expect(bids).toEqual([bidStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne method is called', () => {
      let bid: Bid;

      beforeEach(async () => {
        jest.spyOn(bidModel, 'findOne');
        bid = await repository.findOne(bidFilterQuery);
      });

      test('then it should call the bidModel', () => {
        expect(bidModel.findOne).toBeCalledWith(bidFilterQuery, {
          _id: 0,
          _v: 0,
        });
      });
      test('then it should return a bid', () => {
        expect(bid).toEqual(bidStub());
      });
    });
  });

  describe('findOneAndUpdate', () => {
    describe('when findOneAndUpdate method is called', () => {
      let bid: Bid;
      let updateBid: UpdateBidDto;

      beforeEach(async () => {
        updateBid = {
          bidAmount: 5000,
        };
        jest.spyOn(bidModel, 'findOneAndUpdate');
        bid = await repository.findOneAndUpdate(bidFilterQuery, updateBid);
      });

      test('then it should call the bidModel', () => {
        expect(bidModel.findOneAndUpdate).toBeCalledWith(
          bidFilterQuery,
          updateBid,
          { new: true },
        );
      });
      test('then it should return the updated bid', () => {
        expect(bid).toEqual(bidStub());
      });
    });
  });

  describe('findOneAndDelete', () => {
    describe('when findOneAndDelete method is called', () => {
      let bid: Bid;

      beforeEach(async () => {
        jest.spyOn(bidModel, 'findOneAndDelete');
        bid = await repository.findOneAndDelete(bidFilterQuery);
      });

      test('then it should call the bidModel', () => {
        expect(bidModel.findOneAndDelete).toBeCalledWith(bidFilterQuery);
      });
      test('then it should return the deleted bid', () => {
        expect(bid).toEqual(bidStub());
      });
    });
  });
});

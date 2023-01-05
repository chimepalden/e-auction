import { Test, TestingModule } from '@nestjs/testing';
import { BidsRepository } from '../../bids.repository';
import { CreateBidDto } from '../../dto/create-bid.dto';
import { BidsService } from '../../bids.service';
import { Bid } from '../../schema/bid.schema';
import { bidStub } from '../stubs/bid.stub';
import { UpdateBidDto } from 'src/bids/dto/update-bid.dto';

jest.mock('../../bids.repository');
jest.mock('uuid', () => ({
  v4: () => '0123456789',
}));

describe('BidsService', () => {
  let bidsService: BidsService;
  let bidsRepository: BidsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BidsService, BidsRepository],
    }).compile();

    bidsService = module.get<BidsService>(BidsService);
    bidsRepository = module.get<BidsRepository>(BidsRepository);

    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create method is called', () => {
      let bid: Bid;
      let createBidDto: CreateBidDto;

      beforeEach(async () => {
        createBidDto = bidStub();
        bid = await bidsService.create(createBidDto);
      });

      test('then it should call bids repository', () => {
        expect(bidsRepository.create).toBeCalledWith(createBidDto);
      });
      test('then it should return the bid created', () => {
        expect(bid).toEqual(bidStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll method is called', () => {
      let bids: Bid[];
      beforeEach(async () => {
        bids = await bidsService.findAll();
      });

      test('then it should call bids Repository', () => {
        expect(bidsRepository.find).toBeCalled();
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
        bid = await bidsService.findOne(bidStub().bidId);
      });

      test('then it should call bids repository', () => {
        expect(bidsRepository.findOne).toBeCalledWith({
          bidId: bidStub().bidId,
        });
      });
      test('then it should return a bid', () => {
        expect(bid).toEqual(bidStub());
      });
    });
  });

  describe('update', () => {
    describe('when update method is called', () => {
      let bid: Bid;
      let updateBid: UpdateBidDto;

      beforeEach(async () => {
        updateBid = {
          bidAmount: 3000,
        };
        bid = await bidsService.update(bidStub().bidId, updateBid);
      });

      test('then it should call bids repository', () => {
        expect(bidsRepository.findOneAndUpdate).toBeCalledWith(
          { bidId: bidStub().bidId },
          updateBid,
        );
      });
      test('then it should return updated bid', () => {
        expect(bid).toEqual(bidStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove method is called', () => {
      let bid: Bid;

      beforeEach(async () => {
        bid = await bidsService.remove(bidStub().bidId);
      });

      test('then it should call bids repository', () => {
        expect(bidsRepository.findOneAndDelete).toBeCalledWith({
          bidId: bidStub().bidId,
        });
      });
      test('then it should return the deleted bid', () => {
        expect(bid).toEqual(bidStub());
      });
    });
  });
});

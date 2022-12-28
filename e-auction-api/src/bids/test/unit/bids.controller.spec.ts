import { Test, TestingModule } from '@nestjs/testing';
import { BidsController } from '../../bids.controller';
import { BidsService } from '../../bids.service';
import { CreateBidDto } from '../../dto/create-bid.dto';
import { UpdateBidDto } from '../../dto/update-bid.dto';
import { bidStub } from '../stubs/bid.stub';

jest.mock('../../bids.service');

describe('BidsController', () => {
  let bidController: BidsController;
  let bidService: BidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BidsController],
      providers: [BidsService],
    }).compile();

    bidController = module.get<BidsController>(BidsController);
    bidService = module.get<BidsService>(BidsService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create method is called', () => {
      let bid: CreateBidDto;
      let createBidDto: CreateBidDto;
      beforeEach(async () => {
        createBidDto = {
          bidId: bidStub().bidId,
          bidAmount: bidStub().bidAmount,
          productId: bidStub().productId,
          bidder: bidStub().bidder,
        };
        bid = await bidController.create(createBidDto);
      });
      test('then it should call bids Service', () => {
        expect(bidService.create).toBeCalledWith(createBidDto);
      });

      test('then it should return the bid created', () => {
        expect(bid).toEqual(bidStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll method is called', () => {
      let bids: CreateBidDto[];
      beforeEach(async () => {
        bids = await bidController.findAll();
      });
      test('then it should call bids Service', () => {
        expect(bidService.findAll).toBeCalled();
      });

      test('then it should return bids', () => {
        expect(bids).toEqual([bidStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne method is called', () => {
      let bid: CreateBidDto;
      beforeEach(async () => {
        bid = await bidController.findOne(bidStub().bidId);
      });
      test('then it should call bids Service', () => {
        expect(bidService.findOne).toBeCalledWith(bidStub().bidId);
      });

      test('then it should return a bid', () => {
        expect(bid).toEqual(bidStub());
      });
    });
  });

  describe('update', () => {
    describe('when update method is called', () => {
      let bid: CreateBidDto;
      let updateBid: UpdateBidDto;

      beforeEach(async () => {
        updateBid = {
          bidAmount: 3000,
        };
        bid = await bidController.update(bidStub().bidId, updateBid);
      });

      test('then it should call bids Service', () => {
        expect(bidService.update).toBeCalledWith(bidStub().bidId, updateBid);
      });

      test('then it should return updated bid', () => {
        expect(bid).toEqual(bidStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove method is called', () => {
      let bid: CreateBidDto;
      beforeEach(async () => {
        bid = await bidController.remove(bidStub().bidId);
      });
      test('then it should call bids Service', () => {
        expect(bidService.remove).toBeCalledWith(bidStub().bidId);
      });

      test('then it should return the deleted user', () => {
        expect(bid).toEqual(bidStub());
      });
    });
  });
});

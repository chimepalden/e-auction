import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import { bidStub } from '../stubs/bid.stub';
import * as request from 'supertest';
import { CreateBidDto } from 'src/bids/dto/create-bid.dto';
import { UpdateBidDto } from 'src/bids/dto/update-bid.dto';

describe('BidsController', () => {
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
    await dbConnection.collection('bids').deleteMany({});
  });

  describe('findAll', () => {
    it('should return an array of bids', async () => {
      await dbConnection.collection('bids').insertOne(bidStub());
      const response = await request(httpServer).get('/bids');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([bidStub()]);
    }, 30000);
  });

  describe('create', () => {
    it('It should create a bid', async () => {
      let createBid: CreateBidDto = bidStub();

      const response = await request(httpServer).post('/bids').send(createBid);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        ...response.body,
        bidder: createBid.bidder,
      });

      const bid = await dbConnection
        .collection('bids')
        .findOne({ bidId: response.body.bidId });

      expect(bid.bidId).toEqual(response.body.bidId);
    });
  });

  describe('update', () => {
    it('It should update a bid', async () => {
      let updateBid: UpdateBidDto = {
        bidAmount: 3000,
      };

      await dbConnection.collection('bids').insertOne(bidStub());
      const response = await request(httpServer)
        .patch(`/bids/${bidStub().bidId}`)
        .send(updateBid);

      expect(response.ok);
      expect(response.body.bidId).toEqual(bidStub().bidId);
    });
  });

  describe('findOne', () => {
    it('should return a bid', async () => {
      await dbConnection.collection('bids').insertOne(bidStub());
      const response = await request(httpServer)
        .get('/bids')
        .query({ id: bidStub().bidId });

      expect(response.status).toBe(200);
      expect(response.body[0].bidId).toEqual(bidStub().bidId);
    });
  });

  describe('remove', () => {
    it('should return the bid removed', async () => {
      await dbConnection.collection('bids').insertOne(bidStub());
      const response = await request(httpServer).delete(
        `/bids/${bidStub().bidId}`,
      );

      expect(response.ok);
      expect(response.body.bidId).toEqual(bidStub().bidId);
    });
  });
});

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BuyerService } from './buyer.service';
import { bidStub } from '../stubs/bid.stub';
import { productStub } from '../stubs/product.stub';

fdescribe('BuyerService', () => {
  let buyerService: BuyerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuyerService],
    });

    buyerService = TestBed.inject(BuyerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve detail of the buyer when getBuyerDetail method is called', (done: DoneFn) => {
    let buyerId = bidStub().bidder.userId;
    let testProductList = [productStub()];
    let testBidList = [bidStub()];
    let testBuyerDetail: any = { testProductList, testBidList };

    buyerService.getBuyerDetail(buyerId).subscribe((data) => {
      expect(data).toEqual(testBuyerDetail);
      done();
    });
    const req = httpTestingController.expectOne(
      'http://localhost:3002/buyer/' + buyerId
    );
    expect(req.request.method).toEqual('GET');
    req.flush(testBuyerDetail);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

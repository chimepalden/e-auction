import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { SellerService } from './seller.service';
import { ProductModel } from '../models/productModel';
import { BidModel } from '../models/bidModel';
import { productStub } from '../stubs/product.stub';
import { userStub } from '../stubs/user.stub';
import { bidStub } from '../stubs/bid.stub';

fdescribe('SellerService', () => {
  let sellerService: SellerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SellerService],
    });

    sellerService = TestBed.inject(SellerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve products of the seller when getSellerProducts method is called', (done: DoneFn) => {
    const sellerId = userStub().userId;
    const testProducts: ProductModel[] = [productStub()];

    sellerService.getSellerProducts(sellerId).subscribe((products) => {
      expect(products).toEqual(testProducts);

      const list: ProductModel[] = products as any;
      const product = list.find((product) => product.productId == '123456');
      expect(product?.sellerId).toBe('1234');
      done();
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3002/seller/1234'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(testProducts);
  });

  it('should retrieve list of bids-detail of a product when getProductBidsDetailList method is called', (done: DoneFn) => {
    let bidsIdList: string[] = [bidStub().bidId];
    let testBids: BidModel[] = [bidStub()];

    sellerService.getProductBidsDetailList(bidsIdList).subscribe((data) => {
      expect(data).toEqual(testBids);
      done();
    });
    const req = httpTestingController.expectOne('http://localhost:3002/seller');
    expect(req.request.method).toEqual('GET');
    req.flush(testBids);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

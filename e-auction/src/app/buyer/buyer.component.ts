import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BidModel } from '../models/bidModel';
import { ProductModel } from '../models/productModel';
import { UserModel } from '../models/userModel';
import { AuthService } from '../services/auth.service';
import { BuyerService } from '../services/buyer.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css'],
})
export class BuyerComponent implements OnInit {
  isUserAuthenticated = false;
  userId!: string;
  buyerProductList: ProductModel[] = [];
  buyerBidList: BidModel[] = [];
  productBid!: BidModel;
  currentProduct: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private buyerService: BuyerService
  ) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsAuth();
    if (this.isUserAuthenticated) {
      this.userId = this.authService.getUserId();
      this.buyerService.getBuyerDetail(this.userId).subscribe( res => {
        this.buyerProductList = (res as any).productList;
        this.buyerBidList = (res as any).bidList;
      });
    } else {
      window.alert('Please login to continue');
      this.router.navigate(['/login']);
    }
  }

  showProductDetail(product: ProductModel) {
    for ( let bid of this.buyerBidList){
      if(bid.productId === product.productId && bid.bidder.userId === this.userId){
        this.productBid = bid;
        break;
      }
    }
    this.currentProduct = product;
  }

}

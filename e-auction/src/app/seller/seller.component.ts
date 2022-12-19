import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BidModel } from '../models/bidModel';
import { ProductModel } from '../models/productModel';
import { UserModel } from '../models/userModel';
import { AuthService } from '../services/auth.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit {
  isUserAuthenticated = false;
  userId: string = '';
  sellerProductList: ProductModel[] = [];
  productBidsDetailList: BidModel[] = [];
  currentProduct: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private sellerService: SellerService
  ) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsAuth();
    if (this.isUserAuthenticated) {
      this.userId = this.authService.getUserId();
      this.sellerService.getSellerProducts(this.userId).subscribe((res) => {
        this.sellerProductList = res as any;
      });
    } else {
      window.alert('Please login to continue');
      this.router.navigate(['/login']);
    }
  }

  showProductDetail(product: ProductModel) {
    this.productBidsDetailList = [];
    if (product.bids) {
      this.sellerService.getProductBidsDetailList(product.bids).subscribe( res => 
      this.productBidsDetailList = res as any)
    }
    this.currentProduct = product;
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, Observable } from 'rxjs';
import { BidModel } from '../models/bidModel';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient) {}

  getSellerProducts(id: string) {
    return this.http.get(`http://localhost:3002/seller/${id}`);
  }

  getAllUsers() {
    return this.http.get('http://localhost:3002/users');
  }

  getProductBidsDetailList(bids: string[]): Observable<BidModel[]> {
    console.log(bids)
    let myHeaders = new HttpHeaders({'myHeader': bids})
    return this.http.get<BidModel[]>('http://localhost:3002/seller', {headers: myHeaders});
  }
}

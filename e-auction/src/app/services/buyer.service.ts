import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/productModel';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  constructor(private http: HttpClient) {}

  getBuyerDetail(id: string) {
    return this.http.get(`http://localhost:3002/buyer/${id}`);
  }
}

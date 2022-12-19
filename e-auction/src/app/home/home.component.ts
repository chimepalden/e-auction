import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isUserAuthenticated = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  toSellerPage() {
    this.isUserAuthenticated = this.authService.getIsAuth();
    if (this.isUserAuthenticated) {
      this.router.navigate(['/seller']);
    } else {
      window.alert('Please login to continue.');
      this.router.navigate(['/login']);
    }
  }

  toBuyerPage() {
    this.isUserAuthenticated = this.authService.getIsAuth();
    if (this.isUserAuthenticated) {
      this.router.navigate(['/buyer']);
    } else {
      window.alert('Please login to continue.');
      this.router.navigate(['/login']);
    }
  }
}

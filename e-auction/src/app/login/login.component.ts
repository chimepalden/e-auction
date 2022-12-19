import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  handleLogin(form: NgForm) {
    const credentials = {
      email: form.value.email,
      password: form.value.password,
    };
    console.log(credentials);
    form.reset();
    this.authService.login(credentials);
  }
}

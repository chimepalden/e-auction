import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private access_token = null;
  private user_id: string = '';
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.access_token;
  }

  getUserId() {
    return this.user_id;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    // we cant emit new values from other components,
    // only enabling to emit from service and make other able to listen.
    return this.authStatusListener.asObservable();
  }

  login(credentials: any) {
    return this.http
      .post('http://localhost:3002/auth/login', credentials)
      .pipe(retry(3), catchError(this.handleError))
      .subscribe((response) => {
        this.user_id = (response as any).user_id;
        const token = (response as any).access_token;
        if (token) {
          this.access_token = token;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['']);
        }
      });
  }

  logout() {
    this.access_token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['']);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error
      console.error('An error occurred:', error.error);
    } else {
      // The backend error
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with error
    return throwError(
      () => new Error('Unable to login; please try again later.')
    );
  }
}

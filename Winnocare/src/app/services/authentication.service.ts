import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginState: boolean = false;

  constructor(private router: Router) { }

  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      if (username == "admin" && password == "admin") {
        this.loginState = true;
        resolve(true);
      } else {
        this.loginState = false;
        reject(false);
      }
    });
  }

  isAuthenticated() {
    return this.loginState;
  }
}

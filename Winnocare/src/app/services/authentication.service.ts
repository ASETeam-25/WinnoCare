import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AppConstants } from '../app.constants';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginState: boolean = false;

  constructor(private router: Router, private http: HttpClient) { }

  login(userName: string, password: string) {
    return this.http.post<any>(AppConstants.URL + `/login`, { userName, password }).pipe(map(res => {
      if (res.responseCode == "SUCCESS") {
        this.loginState = true;
      } else {
        this.loginState = false;
      }
      return res;
    }));
  }

  isAuthenticated() {
    return this.loginState;
  }
}

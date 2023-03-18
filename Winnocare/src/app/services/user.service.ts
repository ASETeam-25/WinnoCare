import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConstants } from '../app.constants';
import { Medicine } from '../model/medicine';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  username: string;
  userNameSub = new Subject();
  constructor(private http: HttpClient) { }

  getUsername() {
    return this.username;
  }

  getName() {
    return this.userNameSub;
  }

  setUsername(username: string) {
    this.username = username;
    this.userNameSub.next(this.username);
  }

  register(user: User) {
    return this.http.post(AppConstants.URL + `/user/register`, user, { responseType: 'text' });
  }

  forgotPassword(username: string, password: string) {
    let params = new HttpParams();
    params = params.append('userName', username);
    params = params.append('newPassword', password);
    return this.http.post(AppConstants.URL + `/user/forgotpassword`, '', { params: params, responseType: 'text' });
  }

  getEmergencyContact(username: string) {
    let params = new HttpParams();
    params = params.append('userName', username);
    return this.http.get(AppConstants.URL + `/emergency/contact`, { params: params, responseType: 'text' });
  }
}

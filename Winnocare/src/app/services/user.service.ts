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
    return this.http.post(AppConstants.URL + `/register`, user, { responseType: 'text' });
  }

  forgotPassword(username: string, password: string) {
    let params = new HttpParams();
    params = params.append('userName', username);
    params = params.append('newPassword', password);
    return this.http.post(AppConstants.URL + `/forgotpassword`, '', { params: params, responseType: 'text' });
  }

  addMedicine(medicine: Medicine) {
    medicine["userName"] = this.getUsername();
    return this.http.post(AppConstants.URL + `/medicinedetails`, medicine, { responseType: 'text' });
  }

  getMedicines(username: string) {
    let params = new HttpParams();
    params = params.append('userName', username);
    return this.http.post(AppConstants.URL + `/medicineschedule`, '', { params: params, responseType: 'text' });
  }
}

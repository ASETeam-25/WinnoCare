import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constants';
import { Medicine } from '../model/medicine';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  username: string;
  constructor(private http: HttpClient) { }

  getUsername() {
    return this.username;
  }

  setUsername(username: string) {
    this.username = username;
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
}

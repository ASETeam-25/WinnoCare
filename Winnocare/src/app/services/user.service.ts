import { HttpClient } from '@angular/common/http';
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

  delete(user: User) {
    return this.http.delete(AppConstants.URL + `/users/${user.username}`);
  }

  addMedicine(medicine: Medicine) {
    return this.http.post(AppConstants.URL + `/medicinedetails`, medicine, { responseType: 'text' });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constants';
import { Medicine } from '../model/medicine';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  addMedicine(medicine: Medicine) {
    medicine["userName"] = this.userService.getUsername();
    return this.http.post(AppConstants.URL + `/user/medicinedetails`, medicine, { responseType: 'text' });
  }

  deleteMedicine(username: string, medName: string) {
    let params = new HttpParams();
    params = params.append('userName', username);
    params = params.append('medicineName', medName);
    return this.http.post(AppConstants.URL + `/medicine/delete`, '', { params: params, responseType: 'text' });
  }

  updateMedicine(medicine: Medicine) {
    medicine["userName"] = this.userService.getUsername();
    return this.http.post(AppConstants.URL + `/medicine/update`, medicine, { responseType: 'text' });
  }

  getMedicines(username: string) {
    let params = new HttpParams();
    params = params.append('userName', username);
    return this.http.post(AppConstants.URL + `/user/medicineschedule`, '', { params: params, responseType: 'text' });
  }
}

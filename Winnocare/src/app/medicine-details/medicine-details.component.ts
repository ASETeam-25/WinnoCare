import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { Medicine } from '../model/medicine';
import { Error } from 'src/app/model/error';
import { CommonService } from '../services/common.service';
import { LoadingService } from '../services/loading.service';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.scss'],
})
export class MedicineDetailsComponent implements OnInit {

  medicineDetailsForm: FormGroup;
  existingDosage = [];

  timeOfDay = [
    { "value": "Morning", "checked": false },
    { "value": "Afternoon", "checked": false },
    { "value": "Evening", "checked": false },
    { "value": "Night", "checked": false },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private storageService: StorageService,
    private userService: UserService,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.medicineDetailsForm = this.fb.group({
      name: ['', Validators.required],
      expiry: ['', Validators.required],
      frequency: ['', Validators.required],
      timeOfDay: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      taken: [false]
    });
  }

  updateTimeOfDay(event) {
    event.checked = !event.checked;
    let medicineTime = this.timeOfDay.filter(med => med.checked == true).map(val => val.value);
    if (medicineTime.length > 0) {
      this.medicineDetailsForm.patchValue({ 'timeOfDay': medicineTime })
    } else {
      this.medicineDetailsForm.patchValue({ 'timeOfDay': "" })
    }
  }

  async validateForm(form: FormGroup) {
    if (form.valid) {
      let medicine: Medicine = this.mapData(form);
      await this.loadingService.showLoading("Please wait...");
      this.userService.addMedicine(medicine).subscribe({
        next: (res) => {
          this.loadingService.dismissLoading();
          this.router.navigate(['medicineTracker']);
          this.toastService.showToast('bottom', 'Medicine details saved successfully.');
        }, error: (error: Error) => {
          this.loadingService.dismissLoading();
          if (error.errorMessage.includes("Medicine already added!")) {
            this.toastService.showToast('bottom', 'Medicine is already added. Please try editing the medicine.');
          } else {
            this.toastService.showToast('bottom', 'Cannot add medicine. Please try again later.');
          }
        }
      })
      //await this.storageService.addDosage(this.medicineDetailsForm.value);
      // if (this.route.snapshot.paramMap.get('previousUrl') == "medicineTracker") {
      //   this.router.navigate(['medicineTracker']);
      // } else {
      //   this.router.navigate(['login']);
      // }
    } else {
      this.commonService.validateAllFormFields(form);
    }
  }

  mapData(form: FormGroup) {
    let medicine: Medicine = new Medicine();
    medicine.medicineName = form.get('name')?.value;
    medicine.expiryDate = form.get('expiry')?.value;
    medicine.frequency = form.get('frequency')?.value;
    medicine.timeOfDay = form.get('timeOfDay')?.value;
    medicine.medStartDate = form.get('startDate')?.value;
    medicine.medEndDate = form.get('endDate')?.value;
    return medicine;
  }

}

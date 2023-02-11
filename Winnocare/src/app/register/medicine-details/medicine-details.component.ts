import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.scss'],
})
export class MedicineDetailsComponent implements OnInit {

  medicineDetailsForm: FormGroup;
  existingDosage = [];

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private storageService: StorageService) { }

  ngOnInit() {
    this.medicineDetailsForm = this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
      expiry: ['', Validators.required],
      taken: [false]
    });
  }

  async validateForm(form: FormGroup) {
    console.log('Valid?', form.valid);
    console.log("Value", this.medicineDetailsForm.value);
    if (form.valid) {
      await this.storageService.addDosage(this.medicineDetailsForm.value);
      if (this.route.snapshot.paramMap.get('previousUrl') == "medicineTracker") {
        this.router.navigate(['medicineTracker']);
      } else {
        this.router.navigate(['login']);
      }
    } else {
      this.validateAllFormFields(form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}

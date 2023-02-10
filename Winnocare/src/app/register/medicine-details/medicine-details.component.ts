import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.scss'],
})
export class MedicineDetailsComponent implements OnInit {

  medicineDetailsForm: FormGroup;
  private _storage: Storage | null = null;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.medicineDetailsForm = this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
      expiry: ['', Validators.required]
    })
  }

  validateForm(form: FormGroup) {
    console.log('Valid?', form.valid);
    if (form.valid) {
      this.router.navigate(['login']);
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

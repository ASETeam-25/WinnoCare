import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as countries from '../../../assets/json/countries.json';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {

  personalDetailsForm: FormGroup;
  countryList: { name: string, dial_code: string, code: string }[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.personalDetailsForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      contact: ['', Validators.required],
    });

    fetch('assets/json/countries.json').then(res => res.json())
      .then(jsonData => {
        this.countryList = jsonData;
      });
  }

  validateForm(form: FormGroup) {
    console.log('Valid?', form.valid);
    if (form.valid) {
      this.router.navigate(['register/medicineDetails']);
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

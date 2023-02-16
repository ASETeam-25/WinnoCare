import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {

  personalDetailsForm: FormGroup;
  countryList: { name: string, dial_code: string, code: string }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private commonService: CommonService) { }

  ngOnInit() {
    this.personalDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    fetch('assets/json/countries.json').then(res => res.json())
      .then(jsonData => {
        this.countryList = jsonData;
      });
  }

  validateForm(form: FormGroup) {
    if (form.valid) {
      let user: User = this.mapData(form);
      this.router.navigate(['register/emergencyContacts', { registrationDetails: JSON.stringify(user) }]);
    } else {
      this.commonService.validateAllFormFields(form);
    }
  }

  mapData(form: FormGroup) {
    let user = new User();
    user.firstname = form.get('firstName')?.value;
    user.lastname = form.get('lastName')?.value;
    user.age = form.get('age')?.value;
    user.gender = form.get('gender')?.value;
    user.country = form.get('country')?.value;
    user.contact = form.get('contact')?.value;
    user.email = form.get('email')?.value;
    user.username = form.get('userName')?.value;
    user.password = form.get('password')?.value;
    return user;
  }
}

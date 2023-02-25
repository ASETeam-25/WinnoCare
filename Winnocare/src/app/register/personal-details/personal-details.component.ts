import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
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
      firstName: ['', [Validators.required, Validators.pattern(AppConstants.NAME_PATTERN)]],
      lastName: ['', [Validators.required, Validators.pattern(AppConstants.NAME_PATTERN)]],
      age: ['', [Validators.required, Validators.pattern(AppConstants.AGE_PATTERN)]],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(AppConstants.CONTACT_PATTERN)]],
      email: ['', [Validators.required, Validators.pattern(AppConstants.EMAIL_PATTERN)]],
      userName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), , Validators.pattern(AppConstants.USERNAME_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(AppConstants.PASSWORD_PATTERN)]],
      confirmPassword: ['', Validators.required]
    });

    this.personalDetailsForm.addValidators(
      this.passwordMatchValidator(this.personalDetailsForm.get('password'), this.personalDetailsForm.get('confirmPassword'))
    );

    fetch('assets/json/countries.json').then(res => res.json())
      .then(jsonData => {
        this.countryList = jsonData;
      });
  }

  passwordMatchValidator(passwordControl: AbstractControl | null, confirmPasswordControl: AbstractControl | null): ValidatorFn {
    return () => {
      if (passwordControl?.value !== confirmPasswordControl?.value) {
        return { match_error: 'Value does not match' };
      }
      return null;
    }
  }

  errorMessages = {
    'firstName': [
      { type: 'required', message: 'Please provide your first name.' },
      { type: 'pattern', message: 'Only alphabets are allowed.' }
    ],

    'lastName': [
      { type: 'required', message: 'Please provide your last name.' },
      { type: 'pattern', message: 'Only alphabets are allowed.' }
    ],

    'age': [
      { type: 'required', message: 'Please provide your age.' },
      { type: 'pattern', message: 'Maximum 3 digits are allowed.' }
    ],

    'gender': [
      { type: 'required', message: 'Please select your gender.' }
    ],

    'country': [
      { type: 'required', message: 'Please select your country.' }
    ],

    'contact': [
      { type: 'required', message: 'Please provide a contact number.' },
      { type: 'pattern', message: 'Enter a valid contact number.' }
    ],

    'email': [
      { type: 'required', message: 'Please provide an email.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],

    'userName': [
      { type: 'required', message: 'Please provide user name.' },
      { type: 'minlength', message: 'Minimum length should be 8 characters.' },
      { type: 'maxlength', message: 'Maximum length should be 15 characters.' },
      { type: 'pattern', message: 'Username should contain only alphabets and numbers.' }
    ],

    'password': [
      { type: 'required', message: 'Please provide password.' },
      { type: 'pattern', message: '<label>Password should contain:</label><li>Minimum 8 characters.</li><li>One uppercase letter.</li><li>One lowercase letter.</li><li>One number.</li><li>One special character.</li>' }
    ],

    'confirmPassword': [
      { type: 'required', message: 'Please confirm your password.' }
    ],
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
    user.firstName = form.get('firstName')?.value;
    user.lastName = form.get('lastName')?.value;
    user.age = form.get('age')?.value;
    user.gender = form.get('gender')?.value;
    user.country = form.get('country')?.value.name;
    user.phoneNumber = form.get('contact')?.value;
    user.email = form.get('email')?.value;
    user.userName = form.get('userName')?.value;
    user.password = form.get('password')?.value;
    return user;
  }
}

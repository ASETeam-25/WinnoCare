import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
    private commonService: CommonService,
    private translateService: TranslateService) { }

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
      { type: 'required', message: this.translateService.instant("ERROR.FIRSTNAME") },
      { type: 'pattern', message: this.translateService.instant("ERROR.ONLY_ALPHABETS") }
    ],

    'lastName': [
      { type: 'required', message: this.translateService.instant("ERROR.LASTNAME") },
      { type: 'pattern', message: this.translateService.instant("ERROR.ONLY_ALPHABETS") }
    ],

    'age': [
      { type: 'required', message: this.translateService.instant("ERROR.AGE") },
      { type: 'pattern', message: this.translateService.instant("ERROR.MAXIMUM_AGE_DIGITS") }
    ],

    'gender': [
      { type: 'required', message: this.translateService.instant("ERROR.GENDER") }
    ],

    'country': [
      { type: 'required', message: this.translateService.instant("ERROR.COUNTRY") }
    ],

    'contact': [
      { type: 'required', message: this.translateService.instant("ERROR.CONTACT") },
      { type: 'pattern', message: this.translateService.instant("ERROR.INVALID_CONTACT") }
    ],

    'email': [
      { type: 'required', message: this.translateService.instant("ERROR.EMAIL") },
      { type: 'pattern', message: this.translateService.instant("ERROR.INVALID_EMAIL") }
    ],

    'userName': [
      { type: 'required', message: this.translateService.instant("ERROR.RE_USERNAME") },
      { type: 'minlength', message: this.translateService.instant("ERROR.RE_USERNAME_MIN_LENGTH") },
      { type: 'maxlength', message: this.translateService.instant("ERROR.RE_USERNAME_MAX_LENGTH") },
      { type: 'pattern', message: this.translateService.instant("ERROR.RE_USERNAME_PATTERN") }
    ],

    'password': [
      { type: 'required', message: this.translateService.instant("ERROR.RE_PASSWORD") },
      { type: 'pattern', message: this.translateService.instant("ERROR.RE_PASSWORD_PATTERN") }
    ],

    'confirmPassword': [
      { type: 'required', message: this.translateService.instant("ERROR.CONFIRM_PASSWORD") }
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

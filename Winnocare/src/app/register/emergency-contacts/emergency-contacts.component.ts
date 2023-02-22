import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { Error } from 'src/app/model/error';
import { User } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-emergency-contacts',
  templateUrl: './emergency-contacts.component.html',
  styleUrls: ['./emergency-contacts.component.scss'],
})
export class EmergencyContactsComponent implements OnInit {

  emergencyContactsForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private commonService: CommonService) { }

  ngOnInit() {
    this.emergencyContactsForm = this.fb.group({
      emergencyContact1: ['', [Validators.required, Validators.pattern(AppConstants.CONTACT_PATTERN)]],
      emergencyContact2: ['', [Validators.required, Validators.pattern(AppConstants.CONTACT_PATTERN)]],
      doctorContact1: ['', [Validators.required, Validators.pattern(AppConstants.CONTACT_PATTERN)]],
      doctorContact2: ['', [Validators.required, Validators.pattern(AppConstants.CONTACT_PATTERN)]]
    });
  }

  validateForm(form: FormGroup) {
    if (form.valid) {
      let user: User = this.mapData(form);
      this.loadingService.showLoading("Please wait...");
      this.userService.register(user).subscribe({
        next: (res) => {
          this.loadingService.dismissLoading();
          this.router.navigate(['login']);
        }, error: (error: Error) => {
          this.loadingService.dismissLoading();
          if (error.errorMessage.includes("Username is already taken!")) {
            this.toastService.showToast('bottom', 'Username is already taken. Please try with different username.');
          } else {
            this.toastService.showToast('bottom', 'Registration Failed. Please try again later.');
          }
        }
      });
    } else {
      this.commonService.validateAllFormFields(form);
    }
  }

  mapData(form: FormGroup) {
    let user: User = JSON.parse(this.route.snapshot.paramMap.get('registrationDetails') || '{}');
    user.emergencycontact1 = form.get("emergencyContact1")?.value;
    user.emergencycontact2 = form.get("emergencyContact2")?.value;
    user.doctorcontact1 = form.get("doctorContact1")?.value;
    user.doctorcontact2 = form.get("doctorContact2")?.value;
    return user;
  }
}

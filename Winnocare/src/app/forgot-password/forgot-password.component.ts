import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from '../app.constants';
import { Error } from '../model/error';
import { CommonService } from '../services/common.service';
import { LoadingService } from '../services/loading.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private commonService: CommonService,
    private toastService: ToastService,
    private userService: UserService,
    private loadingService: LoadingService,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      username: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(AppConstants.PASSWORD_PATTERN)]],
      confirmNewPassword: ['', Validators.required]
    });
    this.forgotPasswordForm.addValidators(
      this.passwordMatchValidator(this.forgotPasswordForm.get('newPassword'), this.forgotPasswordForm.get('confirmNewPassword'))
    );
  }

  passwordMatchValidator(passwordControl: AbstractControl | null, confirmPasswordControl: AbstractControl | null): ValidatorFn {
    return () => {
      if (passwordControl?.value !== confirmPasswordControl?.value) {
        return { match_error: 'Value does not match' };
      }
      return null;
    }
  }

  async validateForm(form: FormGroup) {
    if (form.valid) {
      await this.loadingService.showLoading(this.translateService.instant("COMMON.PLEASE_WAIT"));
      this.userService.forgotPassword(this.forgotPasswordForm.get('username')?.value, this.forgotPasswordForm.get('newPassword')?.value).subscribe({
        next: (res) => {
          this.loadingService.dismissLoading();
          this.toastService.showToast('bottom', this.translateService.instant("FORGOT_PASSWORD.PASSWORD_CHANGED_SUCCESFULLY"));
          this.router.navigate(['login']);
        }, error: (error: Error) => {
          this.loadingService.dismissLoading();
          if (error.errorMessage.includes("User not found")) {
            this.toastService.showToast('bottom', this.translateService.instant("FORGOT_PASSWORD.USER_NOT_REGISTERED"));
          } else {
            this.toastService.showToast('bottom', this.translateService.instant("FORGOT_PASSWORD.ERROR_CHANGING_PASSWORD"));
          }
        }
      });
    } else {
      this.commonService.validateAllFormFields(form);
    }
  }

}

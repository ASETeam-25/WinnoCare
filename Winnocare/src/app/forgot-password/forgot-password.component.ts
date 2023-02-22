import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants } from '../app.constants';
import { CommonService } from '../services/common.service';
import { ToastService } from '../services/toast.service';

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
    private toastService: ToastService) { }

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

  validateForm(form: FormGroup) {
    if (form.valid) {
      this.router.navigate(['login']);
    } else {
      this.commonService.validateAllFormFields(form);
    }
  }

}

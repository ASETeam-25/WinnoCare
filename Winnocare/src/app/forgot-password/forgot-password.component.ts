import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
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
    private commonService: CommonService,private toastService: ToastService) { }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    },this.passwordMatch('newPassword', 'confirmNewPassword') );
  }

  passwordMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      if(password !== confirmPassword)
      {
        this.toastService.showToast('bottom', 'Login Failed. Please check username and password.');

      }
         return null
     }
}


  validateForm(form: FormGroup) {
    if (form.valid) {
      //this.router.navigate(['forgotPassword', { registrationDetails: JSON.stringify(user) }]);
    } else {

      this.commonService.validateAllFormFields(form);    }
  }

}

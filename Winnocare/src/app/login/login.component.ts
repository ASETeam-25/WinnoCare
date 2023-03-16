import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Error } from '../model/error';
import { AuthenticationService } from '../services/authentication.service';
import { CommonService } from '../services/common.service';
import { LoadingService } from '../services/loading.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    public menuCtrl: MenuController,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  async validateForm(form: FormGroup) {
    if (form.valid) {
      await this.loadingService.showLoading("Logging in...");
      this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe({
        next: (res) => {
          this.userService.setUsername(this.loginForm.get('username')?.value);
          this.loadingService.dismissLoading();
          this.router.navigate(['dashboard']);
        }, error: (error: Error) => {
          this.loadingService.dismissLoading();
          this.toastService.showToast('bottom', 'Login Failed. Please check username and password.');
        }
      });
    } else {
      this.commonService.validateAllFormFields(form);
    }
  }

  register() {
    this.router.navigate(['register']);
  }
}

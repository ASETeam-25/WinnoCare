import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { ToastPosition } from '@ionic/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private toastController: ToastController,
    public menuCtrl: MenuController) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  login() {
    this.authService.login(this.username, this.password).then(() => {
      this.router.navigate(['dashboard']);
    }, () => {
      this.showToast('bottom', 'Login Failed. Please check username and password.');
    });

  }

  async showToast(position: ToastPosition, message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position
    });
    await toast.present();
  }

  register() {
    this.router.navigate(['register']);
  }
}

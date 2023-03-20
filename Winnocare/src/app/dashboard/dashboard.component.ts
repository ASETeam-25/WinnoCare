import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Error } from '../model/error';
import { LoadingService } from '../services/loading.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  private subscription: Subscription;
  disableSosBtn: boolean = false;

  constructor(
    private router: Router,
    private platform: Platform,
    private userService: UserService,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.getEmergencyContact();
    if (localStorage.getItem("SOS")) {
      this.disableSosBtn = (localStorage.getItem("SOS") == "true");
    }
  }

  toggleSos() {
    this.disableSosBtn = !this.disableSosBtn;
    localStorage.setItem("SOS", this.disableSosBtn.toString());
  }

  configureSos() {
    this.router.navigate(['configureSos']);
  }

  bookDoctor() {
    this.router.navigate(['doctorBookings']);
  }

  medicineTracker() {
    this.router.navigate(['medicineTracker']);
  }

  addMedicine() {
    this.router.navigate(['medicineDetails', { previousUrl: 'dashboard' }]);
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  async getEmergencyContact() {
    await this.loadingService.showLoading(this.translateService.instant("COMMON.LOADING"));
    this.userService.getEmergencyContact(this.userService.getUsername()).subscribe({
      next: (res) => {
        this.loadingService.dismissLoading();
        let result = JSON.parse(res);
        delete result.responseCode;
        delete result.message;
        localStorage.setItem("EmergencyContacts", JSON.stringify(result));
      }, error: (error: Error) => {
        this.loadingService.dismissLoading();
        if (error?.errorMessage?.includes("User not found")) {
          this.toastService.showToast('bottom', this.translateService.instant("DASHBOARD.USER_NOT_FOUND"));
        } else {
          this.toastService.showToast('bottom', this.translateService.instant("DASHBOARD.EMERGENCY_CONTACT_FAILED"));
        }
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../services/loading.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { Error } from '../model/error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configure-sos',
  templateUrl: './configure-sos.component.html',
  styleUrls: ['./configure-sos.component.scss'],
})
export class ConfigureSosComponent implements OnInit {

  contacts = [
    { contact: "emergencyContact1", value: "" },
    { contact: "emergencyContact2", value: "" }
  ];
  defaultContact: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private translateService: TranslateService) { }

  ngOnInit() {
    let result = JSON.parse(localStorage.getItem("EmergencyContacts") || '');
    if (result) {
      this.contacts.forEach((item, index) => {
        item.value = result[item.contact];
        if (result["defultContact"] == item.contact) {
          this.defaultContact = item;
        }
      });
    }
  }

  async updateDefaultContact() {
    await this.loadingService.showLoading(this.translateService.instant("COMMON.LOADING"));
    this.userService.setEmergencyContact(this.userService.getUsername(), this.defaultContact.contact).subscribe({
      next: (res) => {
        this.loadingService.dismissLoading();
        let contacts = JSON.parse(localStorage.getItem("EmergencyContacts") || "");
        contacts["defultContact"] = this.defaultContact.contact;
        localStorage.setItem("EmergencyContacts", JSON.stringify(contacts));
        this.toastService.showToast('bottom', this.translateService.instant("CONFIGURE_SOS.EMERGENCY_CONTACT_UPDATED"));
        this.router.navigate(['dashboard']);
      }, error: (error: Error) => {
        this.loadingService.dismissLoading();
        if (error?.errorMessage?.includes("User not found")) {
          this.toastService.showToast('bottom', this.translateService.instant("CONFIGURE_SOS.USER_NOT_FOUND"));
        } else {
          this.toastService.showToast('bottom', this.translateService.instant("CONFIGURE_SOS.UNABLE_TO_UPDATE_EMERGENCY_CONTACT"));
        }
      }
    });
  }

}

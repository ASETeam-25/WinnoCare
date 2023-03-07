import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Error } from 'src/app/model/error';
import { Medicine } from 'src/app/model/medicine';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss'],
})
export class MedicineListComponent implements OnInit {

  existingDosage: Array<Medicine> = [];
  medicineDetailsSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private userService: UserService,
    private translateService: TranslateService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.existingDosage = [];
    this.loadData();
  }

  async loadData() {
    //this.existingDosage = await this.storageService.getDosage();
    await this.loadingService.showLoading(this.translateService.instant("COMMON.LOADING"));
    this.medicineDetailsSubscription = this.userService.getMedicines(this.userService.getUsername()).subscribe({
      next: (res) => {
        this.loadingService.dismissLoading();
        let result = JSON.parse(res);
        if (result.medicineScheduleResponse.length > 0) {
          for (let element of result.medicineScheduleResponse) {
            this.existingDosage.push(element);
          }
        }
      }, error: (error: Error) => {
        this.loadingService.dismissLoading();
        if (error?.errorMessage?.includes("Medicine Schedule Not Found")) {
          this.toastService.showToast('bottom', this.translateService.instant("MEDICINE_TRACKER.NO_DATA_TO_DISPLAY"));
        } else {
          this.toastService.showToast('bottom', this.translateService.instant("MEDICINE_TRACKER.ERROR_FETCHING_MEDICINES"));
        }
      }
    })
  }

  addNewMedicine() {
    this.router.navigate(['medicineDetails']);
  }

  medicineTaken(item: any) {
    item.taken = !item.taken;
    this.storageService.updateDosage(item);
  }

  navigateToMedicineDetails(item: Medicine) {
    this.medicineDetailsSubscription.unsubscribe();
    this.router.navigate(['medicineDetails', { medicineDetails: JSON.stringify(item) }]);
  }
}

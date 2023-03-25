import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Error } from 'src/app/model/error';
import { StorageService } from 'src/app/services/storage.service';
import { Medicine } from '../model/medicine';
import { CommonService } from '../services/common.service';
import { LoadingService } from '../services/loading.service';
import { MedicineService } from '../services/medicine.service';
import { ToastService } from '../services/toast.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@awesome-cordova-plugins/barcode-scanner/ngx';


@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.scss'],
})
export class MedicineDetailsComponent implements OnInit {

  medicineDetailsForm: FormGroup;
  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  existingDosage = [];

  timeOfDay = [
    { "value": this.translateService.instant("MEDICINE_DETAILS.MORNING"), "checked": false, time: "" },
    { "value": this.translateService.instant("MEDICINE_DETAILS.AFTERNOON"), "checked": false, time: "" },
    { "value": this.translateService.instant("MEDICINE_DETAILS.EVENING"), "checked": false, time: "" },
    { "value": this.translateService.instant("MEDICINE_DETAILS.NIGHT"), "checked": false, time: "" }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private storageService: StorageService,
    private medicineService: MedicineService,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private barcodeScanner: BarcodeScanner,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.medicineDetailsForm = this.fb.group({
      name: ['', Validators.required],
      expiry: ['', Validators.required],
      frequency: ['', Validators.required],
      timeOfDay: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      taken: [false]
    });

    if (this.route.snapshot.paramMap.get('medicineDetails') != null) {
      let medicineData: Medicine = JSON.parse(this.route.snapshot.paramMap.get('medicineDetails') || '');
      if (medicineData != null || medicineData != '') {
        this.medicineDetailsForm.setValue({
          name: medicineData.medicineName,
          expiry: medicineData.expiryDate,
          frequency: medicineData.frequency,
          timeOfDay: medicineData.timeOfDay,
          startDate: medicineData.medStartDate,
          endDate: medicineData.medEndDate,
          taken: [false]
        });
        this.timeOfDay.filter(o1 => medicineData.timeOfDay.some(o2 => o1.value === o2)).map(val => val.checked = true);
      }
    }
  }

  updateTimeOfDay(event) {
    event.checked = !event.checked;
    let medicineTime = this.timeOfDay.filter(med => med.checked == true).map(val => val.value);
    if (medicineTime.length > 0) {
      this.medicineDetailsForm.patchValue({ 'timeOfDay': medicineTime })
    } else {
      this.medicineDetailsForm.patchValue({ 'timeOfDay': "" })
    }
  }

  async validateForm(form: FormGroup) {
    if (form.valid) {
      let medicine: Medicine = this.mapData(form);
      await this.loadingService.showLoading(this.translateService.instant("COMMON.PLEASE_WAIT"));
      if (this.route.snapshot.paramMap.get('medicineDetails') != null) {
        this.updateMedicine(medicine);
      } else {
        this.addMedicine(medicine);
      }

      //await this.storageService.addDosage(this.medicineDetailsForm.value);
      // if (this.route.snapshot.paramMap.get('previousUrl') == "medicineTracker") {
      //   this.router.navigate(['medicineTracker']);
      // } else {
      //   this.router.navigate(['login']);
      // }
    } else {
      this.commonService.validateAllFormFields(form);
    }
  }

  addMedicine(medicine: Medicine) {
    this.medicineService.addMedicine(medicine).subscribe({
      next: (res) => {
        this.loadingService.dismissLoading();
        if (this.route.snapshot.paramMap.get('previousUrl') === "dashboard") {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['medicineTracker']);
        }
        this.toastService.showToast('bottom', this.translateService.instant("MEDICINE_DETAILS.MEDICINE_DETAILS_SAVED_SUCCESSFULLY"));
      }, error: (error: Error) => {
        this.loadingService.dismissLoading();
        if (error.errorMessage.includes("Medicine already added!")) {
          this.toastService.showToast('bottom', this.translateService.instant("MEDICINE_DETAILS.MEDICINE_ALREADY_ADDED"));
        } else {
          this.toastService.showToast('bottom', this.translateService.instant("MEDICINE_DETAILS.CANNOT_ADD_MEDICINE"));
        }
      }
    })
  }

  updateMedicine(medicine: Medicine) {
    this.medicineService.updateMedicine(medicine).subscribe({
      next: (res) => {
        this.loadingService.dismissLoading();
        this.router.navigate(['medicineTracker']);
        this.toastService.showToast('bottom', this.translateService.instant("MEDICINE_DETAILS.MEDICINE_DETAILS_UPDATED_SUCCESSFULLY"));
      }, error: (error: Error) => {
        this.loadingService.dismissLoading();
        if (error.errorMessage.includes("Details Not found")) {
          this.toastService.showToast('bottom', this.translateService.instant("MEDICINE_DETAILS.MEDICINE_NOT_FOUND"));
        } else {
          this.toastService.showToast('bottom', this.translateService.instant("MEDICINE_DETAILS.CANNOT_UPDATE_MEDICINE"));
        }
      }
    })
  }

  mapData(form: FormGroup) {
    let medicine: Medicine = new Medicine();
    medicine.medicineName = form.get('name')?.value;
    medicine.expiryDate = form.get('expiry')?.value;
    medicine.frequency = form.get('frequency')?.value;
    medicine.timeOfDay = form.get('timeOfDay')?.value;
    medicine.medStartDate = form.get('startDate')?.value;
    medicine.medEndDate = form.get('endDate')?.value;
    return medicine;
  }

  timeSelected(event: any, time: any) {
    this.timeOfDay.filter((item) => item.value == time.value).map((val) => val.time = event.detail.value);
  }


  //barcode 1 : 01034531200000111719112510ABCD1234
  // (01)03453120000011 GTIN number
  //(17)191125 Expiry date
 //(10)ABCD1234 Batch lot

 //barcode 2 :01095011010209171719050810ABCD1234
 //(01)09501101020917 (17)190508 (10)ABCD12342110

 //barcode 3 : 01034531200000111719112510ABCD1234
 //GTIN (01): 03453120000011
 //EXPIRY: 2019-11-25
 //BATCH/LOT (10): ABCD1234

 //barcode 4 : 01050601419000151719020010ABC123992
 //(01)05060141900015 (17)190200 (10)ABC123992

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData;

      const GTINStartIndex = this.scannedData.indexOf("(01)");
      const ExpiryDateStartIndex = this.scannedData.indexOf("(17)");

      const id01Value = this.scannedData.substring(GTINStartIndex + 4, GTINStartIndex);
      const id17Value = this.scannedData.substring(ExpiryDateStartIndex + 4, ExpiryDateStartIndex);


    }).catch(err => {
      console.log('Error', err);
    });
  }

}

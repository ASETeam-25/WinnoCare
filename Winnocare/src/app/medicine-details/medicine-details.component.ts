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
import * as moment from 'moment';


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

  medicineNameMap = [
    { GTIN: "03453120000011", name: "Tylenol" },
    { GTIN: "09501101020913", name: "Delsym" },
    { GTIN: "05060141900015", name: "Aspirin" },
    { GTIN: "05030141900015", name: "Mucinex" }
  ]

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
        if (error.errorMessage.includes("Medicine Name already present")) {
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

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: this.translateService.instant('MEDICINE_DETAILS.PLACE_BARCODE'),
      resultDisplayDuration: 500,
      orientation: 'portrait',
    };

      this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);

      const GTINStartIndex = barcodeData.text.indexOf("01");
      if(GTINStartIndex == 0){
        const id01Value = barcodeData.text.substring(2, 16);

      const ExpiryDateStartIndex = barcodeData.text.indexOf("17");
      if(ExpiryDateStartIndex == 16)
      {
      const id17Value = barcodeData.text.substring(18,24);

      let medName = this.medicineNameMap.find((val) => val.GTIN == id01Value);
      this.medicineDetailsForm.patchValue({'name':medName?.name});

      let expDate = moment("20"+id17Value).format("yyyy-MM-DD");
      this.medicineDetailsForm.patchValue({'expiry':expDate});
      }
      else{
        this.toastService.showToast('bottom', this.translateService.instant("MEDICINE_DETAILS.DATA_MATRIX_NOT_FOUND"));
      }
      }
      else{
        this.toastService.showToast('bottom', this.translateService.instant("MEDICINE_DETAILS.DATA_MATRIX_NOT_FOUND"));
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

}

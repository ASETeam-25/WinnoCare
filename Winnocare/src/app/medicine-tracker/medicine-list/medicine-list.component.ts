import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss'],
})
export class MedicineListComponent implements OnInit {

  name: string;
  existingDosage: any = [];

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.loadData();
  }

  async loadData() {
    this.existingDosage = await this.storageService.getDosage();
  }

  addNewMedicine() {
    this.router.navigate(['medicineDetails', { previousUrl: 'medicineTracker' }]);
  }

  medicineTaken(item: any) {
    item.taken = !item.taken;
    this.storageService.updateDosage(item);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicineTrackerRoutingModule } from './medicine-tracker-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineDueComponent } from './medicine-due/medicine-due.component';


@NgModule({
  declarations: [MedicineListComponent, MedicineDueComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MedicineTrackerRoutingModule
  ]
})
export class MedicineTrackerModule { }

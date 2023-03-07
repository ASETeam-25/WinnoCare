import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicineTrackerRoutingModule } from './medicine-tracker-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineDueComponent } from './medicine-due/medicine-due.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [MedicineListComponent, MedicineDueComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MedicineTrackerRoutingModule,
    TranslateModule.forChild()
  ]
})
export class MedicineTrackerModule { }

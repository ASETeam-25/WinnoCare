import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { EmergencyContactsComponent } from './emergency-contacts/emergency-contacts.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { RegisterRoutingModule } from './register-routing.module';


@NgModule({
  declarations: [PersonalDetailsComponent, EmergencyContactsComponent, MedicineDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    RegisterRoutingModule
  ]
})
export class RegisterModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { IonicModule } from '@ionic/angular';
import { EmergencyContactsComponent } from './emergency-contacts/emergency-contacts.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PersonalDetailsComponent, EmergencyContactsComponent, MedicineDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmergencyContactsComponent } from './emergency-contacts/emergency-contacts.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'personalDetails',
    pathMatch: 'full',
  },
  {
    path: 'personalDetails',
    component: PersonalDetailsComponent
  },
  {
    path: 'emergencyContacts',
    component: EmergencyContactsComponent
  },
  {
    path: 'medicineDetails',
    component: MedicineDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }

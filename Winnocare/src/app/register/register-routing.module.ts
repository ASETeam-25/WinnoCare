import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmergencyContactsComponent } from './emergency-contacts/emergency-contacts.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }

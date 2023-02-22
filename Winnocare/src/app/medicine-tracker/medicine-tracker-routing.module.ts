import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineDueComponent } from './medicine-due/medicine-due.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineTrackerComponent } from './medicine-tracker.component';

const routes: Routes = [
  {
    path: '',
    component: MedicineTrackerComponent,
    children: [
      {
        path: '',
        redirectTo: 'medicineList',
        pathMatch: 'full',
      },
      {
        path: 'medicineList',
        component: MedicineListComponent
      },
      {
        path: 'medicineDue',
        component: MedicineDueComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'medicineList',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineTrackerRoutingModule { }

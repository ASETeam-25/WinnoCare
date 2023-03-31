import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConfigureSosComponent } from './configure-sos/configure-sos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorBookingsComponent } from './doctor-bookings/doctor-bookings.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { SettingsComponent } from './settings/settings.component';
import { FoldingClothesComponent } from './folding-clothes/folding-clothes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'doctorBookings',
    component: DoctorBookingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'medicineDetails',
    component: MedicineDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'medicineTracker',
    loadChildren: () => import('./medicine-tracker/medicine-tracker.module').then(m => m.MedicineTrackerModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'configureSos',
    component: ConfigureSosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'foldClothes',
    component: FoldingClothesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorBookingsComponent } from './doctor-bookings/doctor-bookings.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MedicineTrackerComponent } from './medicine-tracker/medicine-tracker.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, DoctorBookingsComponent, MedicineTrackerComponent],
  imports: [CommonModule, BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [AuthGuard, AuthenticationService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }

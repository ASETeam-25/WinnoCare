import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  private subscription: Subscription;

  constructor(private router: Router, private platform: Platform) { }

  ngOnInit() {}

  bookDoctor() {
    this.router.navigate(['doctorBookings']);
  }

  medicineTracker() {
    this.router.navigate(['medicineTracker']);
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });
  }
  
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

}

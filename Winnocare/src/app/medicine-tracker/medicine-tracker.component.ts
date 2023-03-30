import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-medicine-tracker',
  templateUrl: './medicine-tracker.component.html',
  styleUrls: ['./medicine-tracker.component.scss'],
})
export class MedicineTrackerComponent implements OnInit {

  private activeTab?: HTMLElement;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService) { }

  ngOnInit() { }

  tabChange(tabsRef: IonTabs) {
    this.activeTab = tabsRef.outlet.activatedView?.element;
  }

  ionViewWillLeave() {
    this.propagateToActiveTab('ionViewWillLeave');
  }

  ionViewDidLeave() {
    this.propagateToActiveTab('ionViewDidLeave');
  }

  ionViewWillEnter() {
    this.propagateToActiveTab('ionViewWillEnter');
  }

  ionViewDidEnter() {
    this.propagateToActiveTab('ionViewDidEnter');
  }

  private propagateToActiveTab(eventName: string) {
    if (this.activeTab) {
      this.activeTab.dispatchEvent(new CustomEvent(eventName));
    }
  }

}

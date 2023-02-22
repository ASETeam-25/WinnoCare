import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-medicine-tracker',
  templateUrl: './medicine-tracker.component.html',
  styleUrls: ['./medicine-tracker.component.scss'],
})
export class MedicineTrackerComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() { }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency-contacts',
  templateUrl: './emergency-contacts.component.html',
  styleUrls: ['./emergency-contacts.component.scss'],
})
export class EmergencyContactsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  next() {
    this.router.navigate(['register/medicineDetails']);
  }

}

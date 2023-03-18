import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configure-sos',
  templateUrl: './configure-sos.component.html',
  styleUrls: ['./configure-sos.component.scss'],
})
export class ConfigureSosComponent implements OnInit {

  contacts = [
    { contact: "emergencyContact1" },
    { contact: "emergencyContact2" }
  ];
  defaultContact: string = "";

  constructor() { }

  ngOnInit() {

  }

  contactSelected(contact: string) {
    console.log(contact);
  }

  updateDefaultContact() {

  }

}

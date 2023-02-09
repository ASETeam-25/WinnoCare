import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as countries from '../../../assets/json/countries.json';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {

  name: any;
  age: any;
  gender:any;
  country:any;
  contact:any;
  countryList:{name:string, dial_code: string, code:string}[] = [];
 
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // fetch('assets/countries.json').then(res => res.json())
    // .then(jsonData => {
    //   this.countryList = jsonData;
    // });
  }

  next() {
    this.router.navigate(['register/emergencyContacts']);
  }

}

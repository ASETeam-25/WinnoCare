import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ToastPosition } from '@ionic/core';
import * as countries from '../../../assets/json/countries.json';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {

  name: any;
  age: any;
  gender: any;
  country: any;
  contact: any;
  countryList: { name: string, dial_code: string, code: string }[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private toastController: ToastController) { }

  ngOnInit() {
    fetch('assets/json/countries.json').then(res => res.json())
      .then(jsonData => {
        this.countryList = jsonData;
      });
  }

  next() {
    this.router.navigate(['register/emergencyContacts']);


  }

  async showToast(position: ToastPosition, message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position
    });
    await toast.present();
  }

}

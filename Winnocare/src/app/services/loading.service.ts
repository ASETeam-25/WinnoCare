import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: any;

  constructor(
    private loadingCtrl: LoadingController) { }

  async showLoading(msg: string) {
    this.loading = await this.loadingCtrl.create({
      message: msg,
      spinner: 'circles',
    });

    this.loading.present();
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

}

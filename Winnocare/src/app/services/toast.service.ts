import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastPosition } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async showToast(position: ToastPosition, message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position
    });
    await toast.present();
  }
}

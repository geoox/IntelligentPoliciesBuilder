import { Injectable } from '@angular/core';
import { AlertController } from '../../node_modules/@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(public alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login',
      subHeader: 'Wrong user/password',
      message: 'Please try again',
      buttons: ['OK'],
      backdropDismiss: true,
      animated: true,
      mode: 'ios'
    });

    await alert.present();
  }
}

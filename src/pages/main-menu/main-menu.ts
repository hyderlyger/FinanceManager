import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenu {

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainMenu');
  }
  openProfile()
  {
    let alert = this.alertCtrl.create({
      title: 'Perfil!',
      subTitle: 'Clicked!',
      buttons: ['OK']
    });
    alert.present();
  }
}

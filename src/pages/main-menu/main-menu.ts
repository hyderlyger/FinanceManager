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
  showAlert(msg : string){
    let alert = this.alertCtrl.create({
      title: msg,
      subTitle: 'Clicked!',
      buttons: ['OK']
    });
    alert.present();
  }
  
  openProfile()
  {
    this.showAlert('Perfil!');
  }
  openPanel(){
    this.showAlert('Panel!');
  }
  openCategories(){
    this.showAlert('Categories!');
  }
  openAccounts(){
    this.showAlert('Accounts!');
  }
  openSettings(){
    this.showAlert('Settings!');
  }
  
}
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MenuProfile } from '../menu-profile/menu-profile'
import { MenuPanel } from '../menu-panel/menu-panel'
import { MenuCategories } from '../menu-categories/menu-categories'
import { MenuAccounts } from '../menu-accounts/menu-accounts'
import { MenuSettings } from '../menu-settings/menu-settings'

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
      subTitle: 'Clicked',
      buttons: ['OK']
    });
    alert.present();
  }
  
  openProfile(){
    this.navCtrl.push(MenuProfile);
  }
  openPanel(){
    this.navCtrl.push(MenuPanel);
  }
  openCategories(){
    this.navCtrl.push(MenuCategories);
  }
  openAccounts(){
    this.navCtrl.push(MenuAccounts);
  }
  openSettings(){
    this.navCtrl.push(MenuSettings);
  }
  
}
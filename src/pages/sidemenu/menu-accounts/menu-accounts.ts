import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menu-accounts',
  templateUrl: 'menu-accounts.html',
})
export class MenuAccounts {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuAccounts');
  }
  goback(){
    this.navCtrl.pop();
  }
}

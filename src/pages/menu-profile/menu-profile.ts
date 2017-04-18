import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menu-profile',
  templateUrl: 'menu-profile.html',
})
export class MenuProfile {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuProfile');
  }
  goback(){
    this.navCtrl.pop();
  }
}

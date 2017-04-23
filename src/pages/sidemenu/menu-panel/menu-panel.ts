import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menu-panel',
  templateUrl: 'menu-panel.html',
})
export class MenuPanel {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPanel');
  }
  goback(){
    this.navCtrl.pop();
  }
}

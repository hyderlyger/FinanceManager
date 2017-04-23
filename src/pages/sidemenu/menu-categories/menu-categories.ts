import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menu-categories',
  templateUrl: 'menu-categories.html',
})
export class MenuCategories {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuCategories');
  }
  goback(){
    this.navCtrl.pop();
  }
}

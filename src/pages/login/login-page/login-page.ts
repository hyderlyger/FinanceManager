import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Timeline } from '../../timeline/timeline/timeline';
import { RegisterationInfoPage } from '../registeration-info-page/registeration-info-page';
@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  trylogin(){
    //For now no authentication check
    this.navCtrl.setRoot(Timeline);
  }
  RegisterMe(){
    this.navCtrl.push(RegisterationInfoPage);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterationCredentialsPage } from '../registeration-credentials-page/registeration-credentials-page';

@IonicPage()
@Component({
  selector: 'page-registeration-info-page',
  templateUrl: 'registeration-info-page.html',
})
export class RegisterationInfoPage {
  dob : string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dob = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterationInfoPage');
  }
  next()
  {
    this.navCtrl.push(RegisterationCredentialsPage);
  }
  GoBackToLogin(){
    this.navCtrl.popToRoot();
  }
}

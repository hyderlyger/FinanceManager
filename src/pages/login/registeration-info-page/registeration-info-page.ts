import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Timeline } from '../../timeline/timeline/timeline';
import { RegisterationCredentialsPage } from '../registeration-credentials-page/registeration-credentials-page';

@IonicPage()
@Component({
  selector: 'page-registeration-info-page',
  templateUrl: 'registeration-info-page.html',
})
export class RegisterationInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

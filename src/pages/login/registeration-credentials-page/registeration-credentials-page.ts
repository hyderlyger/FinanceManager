import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Timeline } from '../../timeline/timeline/timeline';

@IonicPage()
@Component({
  selector: 'page-registeration-credentials-page',
  templateUrl: 'registeration-credentials-page.html',
})
export class RegisterationCredentialsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterationCredentialsPage');
  }
  Register()
  {
    this.navCtrl.setRoot(Timeline);
    //this.navCtrl.popToRoot(); // no need, is done automatically
  }
  GoBackToLogin(){
    this.navCtrl.popToRoot();
  }
}

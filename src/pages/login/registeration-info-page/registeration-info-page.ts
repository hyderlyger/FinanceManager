import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterationCredentialsPage } from '../registeration-credentials-page/registeration-credentials-page';

@IonicPage()
@Component({
  selector: 'page-registeration-info-page',
  templateUrl: 'registeration-info-page.html',
})
export class RegisterationInfoPage {
  fullname : string = "";
  email : string = "";
  dob : string = "";
  error : string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dob = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterationInfoPage');
  }
  next()
  {
    if( this.fullname && this.email && this.dob)
    {
      let data= { fullname : this.fullname, email : this.email, dob : this.dob };
      this.navCtrl.push(RegisterationCredentialsPage,data);
    }else{
      this.error = "Please fill all fields";
    }
}
  GoBackToLogin(){
    this.navCtrl.popToRoot();
  }
}

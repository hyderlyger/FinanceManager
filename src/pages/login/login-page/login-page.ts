import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Timeline } from '../../timeline/timeline/timeline';
import { RegisterationInfoPage } from '../registeration-info-page/registeration-info-page';

import { AuthProvider } from '../../../providers/auth-provider';

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  userid : string = "";
  userpass : string = "";
  error : string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
               public authProvider : AuthProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  trylogin(){
    if(this.userid && this.userpass)
    {
      this.authProvider.authenticateUser(this.userid, this.userpass).then((result : string)=>{
        if(result == "Accepted")
          this.navCtrl.setRoot(Timeline);
        else
          this.error = result;
      });
    }else{
      this.error = "Please fill all fields";
    }
  }
  RegisterMePage(){
    this.navCtrl.push(RegisterationInfoPage);
  }

}

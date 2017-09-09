import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Timeline } from '../../timeline/timeline/timeline';

import { AuthProvider } from '../../../providers/auth-provider';

@IonicPage()
@Component({
  selector: 'page-registeration-credentials-page',
  templateUrl: 'registeration-credentials-page.html',
})
export class RegisterationCredentialsPage {
  userid : string = "";
  password1 : string = "";
  password2 : string = "";
  error : string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl : AlertController,
              public authProvider : AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterationCredentialsPage');
  }
  Register()
  {
    if( this.userid && this.password1 && this.password2)
    {
      if(this.password1 == this.password2)  //both passwords are matching
      {
        this.authProvider.registerUser( this.userid, 
                                        this.navParams.get("fullname"),
                                        this.navParams.get("email"),
                                        this.navParams.get("dob"),  
                                        this.userid,
                                        this.password1).then((result : string)=> {
                                          if(result == "Accepted"){
                                            this.navCtrl.setRoot(Timeline);
                                            this.PostData(this.navParams.get("fullname"),
                                                          this.navParams.get("email"),
                                                          this.navParams.get("dob"));
                                          }else
                                            this.error = result;
                                        });
      }else{
        this.error = "As senhas devem ser idênticas."; //"Passwords must be identical";
      }
    }else{
      this.error = "Preencha todos os campos"; //"Please fill all fields";
    }
  }
  GoBackToLogin(){
    this.navCtrl.popToRoot();
  }
  showAlert(title: string, subTitle: string, buttonText : string){
    var alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [buttonText]
      });
    alert.present();
  }
  PostData(name : string, email : string, date : Date){
    this.authProvider.PostUserDataToURL(name, email, date ? date.toLocaleString() : "999");
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterationCredentialsPage } from '../registeration-credentials-page/registeration-credentials-page';
import { DatePicker} from '@ionic-native/date-picker';
@IonicPage()
@Component({
  selector: 'page-registeration-info-page',
  templateUrl: 'registeration-info-page.html',
})
export class RegisterationInfoPage {
  fullname : string = "";
  email : string = "";
  dob : Date;
  error : string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker) {
    this.dob = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterationInfoPage');
  }
  next()
  {
    if( this.fullname && this.email ) //&& this.dob)
    {
      if(this.validateEmail(this.email)){

        let data= { fullname : this.fullname, email : this.email, dob : this.dob };
        this.navCtrl.push(RegisterationCredentialsPage,data);

      }else
        this.error = "E-mail inválido"; //"Invalid Email.";
    }else
      this.error = "Preencha todos os campos";//"Please fill all fields";
  }
  GoBackToLogin(){
    this.navCtrl.popToRoot();
  }

  showDatePicker(){
    this.datePicker.show({
          date: new Date(),
          mode: 'date',
          androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
          date => {
              this.onfilterdateChange(date);
          }, err =>{

          }
      );
  }
  onfilterdateChange(val){
    if(val){
      this.dob = new Date(val);
    }
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}

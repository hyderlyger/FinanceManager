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
  dob : string = "";
  dobRaw : Date;
  error : string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker) {
    this.dobRaw = new Date();
    this.dob = this.formatddmmyy(this.dobRaw);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterationInfoPage');
  }
  next()
  {
    if( this.fullname && this.email && this.dob)
    {
      let data= { fullname : this.fullname, email : this.email, dob : this.dobRaw };
      this.navCtrl.push(RegisterationCredentialsPage,data);
    }else{
      this.error = "Please fill all fields";
    }
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
      this.dobRaw = new Date(val);
      this.dob = this.formatddmmyy(this.dobRaw);
    }
  }
  formatddmmyy(today : Date){
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    let ddfixed : string,mmfixed : string;

    var yyyy = today.getFullYear();
    if(dd<10){
        ddfixed='0'+dd;
    } 
    if(mm<10){
        mmfixed='0'+mm;
    } 
    return ddfixed+'/'+mmfixed+'/'+yyyy;
  }
}

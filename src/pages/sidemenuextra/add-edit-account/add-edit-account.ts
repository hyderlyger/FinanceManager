import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

import { Account } from '../../../models/account';
import { DBProvider } from '../../../providers/db-provider';
import { ImagesProvider } from '../../../providers/images-provider';

@IonicPage()
@Component({
  selector: 'page-add-edit-account',
  templateUrl: 'add-edit-account.html',
})
export class AddEditAccount {

  _account : Account = new Account("","",0,null,false,0);
  _accountImagesArray : Array<string>= [];
  _startingdate : Date; //for ion-datetime
  _isAddPage = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dbprovider : DBProvider,
              private imageprovider : ImagesProvider, private alertCtrl : AlertController,
              private datePicker: DatePicker) {

                this._accountImagesArray = this.imageprovider.getUseableAccountsImages();
                this._account.id = this.navParams.get("selectedAccountIDforEdit");  //would be null in case of new account

                if(this.dbprovider.accounts.length>0) //accounts exist
                {
                  if(this._account.id){ //Edit
                    let matchedaccount = this.dbprovider.accounts.find(item => item.id == this._account.id);
                    this._account.clone(matchedaccount); // for deep copy : simple assignment makes shallow one
                    this._startingdate = new Date(this._account.initialdate);

                  }else{  //Add New
                    this._isAddPage = true;
                    this._account.id = "";
                    this._account.imageindex = 0;  //first img
                    this._startingdate = new Date();
                    this._account.issystem = false;
                    this._account.startingbalance = 0;
                    this._account.subject = "";
                  }
                }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEditAccount');
  }

  updateSelection(imgindex : number){
    this._account.imageindex = imgindex;
  }

  saveEntry()
  {
    if( (this._account.imageindex || this._account.imageindex == 0) && this._startingdate &&
        (this._account.startingbalance || this._account.startingbalance == 0 &&
         this._account.subject && this.notJustWhiteSpaces(this._account.subject)) ){  //Edit Case

        this._account.initialdate = new Date(this._startingdate);
        this.dbprovider.addOrUpdateAccount(this._account).then(result=>{
        this.navCtrl.popToRoot();
      });
    }else{
      //this.showAlert("Error","All fields are required.","Ok");
      this.showAlert("Erro","Todos os campos são necessários.","Ok");
    }
  }

  showDatePicker(){
    this.datePicker.show({
          date: this._startingdate,
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
      this._startingdate = new Date(val);
    }
  }

  showAlert(title: string, subTitle: string, buttonText : string){
    var alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [buttonText]
      });
    alert.present();
  }
  notJustWhiteSpaces(str : string){
    return /\S/.test(str);
  }
}

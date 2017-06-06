import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController, AlertController  } from 'ionic-angular';

import { PopoverRecurrenceType } from '../../../components/popover-recurrence-type/popover-recurrence-type';
import { RecurrenceType } from '../../../models/enums';

@IonicPage()
@Component({
  selector: 'page-modal-recurrence',
  templateUrl: 'modal-recurrence.html',
})
export class ModalRecurrence {

  _repeatCount : number;
  _repeatType : RecurrenceType;

  _recurrenceTypes : Array<string> = ["Diário","Semanal","Mensal"];
  _recurrenceTypesPlural : Array<string> = ["dias","Semanas","Meses"];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl : AlertController, 
              private viewCtrl : ViewController, private popoverCtrl : PopoverController) {
                this._repeatType = RecurrenceType.Daily; //default
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalRecurrence');
  }
  
  //PopOver
  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverRecurrenceType);
    popover.present({
      ev: ev
    });
    popover.onDidDismiss((type : RecurrenceType) => {
      if(type || type == 0)
        this._repeatType = type;
    });
  }

  saveRecurrence(){
    if(this._repeatCount && this._repeatCount >0){
      this.viewCtrl.dismiss({repeatCount : this._repeatCount, repeatType: this._repeatType});
    }else{
      //this.showAlert("Error","Repeat count must be greater than zero","Ok");
      this.showAlert("Erro","A contagem repetida deve ser maior que zero","Ok");
    }
  }
  cancelAndClose(){
    this.viewCtrl.dismiss();
  }
  showAlert(title: string, subTitle: string, buttonText : string){
    var alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [buttonText]
      });
    alert.present();
  }
}

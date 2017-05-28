import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { UUID } from 'angular2-uuid';

import { AmountEntry } from '../../../models/amountEntry';
import { Category } from '../../../models/category'
import { Type } from '../../../models/enums';
import { RecurrenceType } from '../../../models/enums';

import { DBProvider } from '../../../providers/db-provider';
import { ImagesProvider } from '../../../providers/images-provider';

import { ModalRecurrence } from '../modal-recurrence/modal-recurrence';

@IonicPage()
@Component({
  selector: 'page-select-category',
  templateUrl: 'select-category.html',
})
export class SelectCategory {
  type : Type;
  selectedCategoryid : string;
  price : Number;
  _categories : Array<Category>;

  //recurrence
  _repeatCount : number;
  _repeatType : RecurrenceType;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl : ModalController,
              private dbprovider : DBProvider, private imageprovider : ImagesProvider,
              private alertCtrl : AlertController) {
                this.price = this.navParams.get("price");
                this.type = navParams.get("type");
                this._categories = this.dbprovider.categories;

                if(this._categories.find(item => item.type == this.type))
                  this.selectedCategoryid = this._categories.find(item => item.type == this.type).id;
                
                //defaults
                this._repeatCount = 1;
                this._repeatType = RecurrenceType.Daily;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCategory');
  }
  ionViewWillEnter(){ //every time gets active
  }
  
  updateSelection(index : number)
  {
    this.selectedCategoryid =  this._categories[index].id;
  }
  saveEntry()
  {

    if(this.selectedCategoryid && this._repeatCount && this._repeatCount >0){
      let currentdate = new Date(this.navParams.get("date"));
      let cycles = this._repeatCount;
      do
      {
        this.AddAmountEntry(currentdate.toISOString());
        switch(this._repeatType){
          case RecurrenceType.Daily:
            currentdate.setDate(currentdate.getDate() + 1);
            break;
          case RecurrenceType.Weekly:
            currentdate.setDate(currentdate.getDate() + 7);
            break;
          case RecurrenceType.Monthly:
            currentdate.setMonth(currentdate.getMonth() + 1);
            break;
          default:
            break;
        }
        cycles--;
      }while(cycles >0);

      this.navCtrl.popToRoot();
    }
  }
  AddAmountEntry( _date : string){
    this.dbprovider.addEntry( new AmountEntry( UUID.UUID(),
                              this.navParams.get("price"),
                              this.type,
                              this.navParams.get("observations") == true ? this.navParams.get("observations") : "",
                              new Date(_date),
                              false,  //not a system entry
                              this.navParams.get("accountid"),
                              this.selectedCategoryid )).then(()=>{
                                  //nothing here
                              })
  }
  openRecurrence(){
    if(this.dbprovider.isUserAccessLevelPreminum){
      let pageModal = this.modalCtrl.create(ModalRecurrence);

      pageModal.onDidDismiss(data => {

        if(data){ //meaningful data
          this._repeatCount = data.repeatCount;
          this._repeatType = data.repeatType;
        }

      });

      pageModal.present();
    }else{
      this.showAlert("Access Denied","Get Premium version to use this feature.","Ok");
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
}

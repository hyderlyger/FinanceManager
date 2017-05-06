import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Type } from '../../../models/enums';
import { AlertController } from 'ionic-angular';
import { SelectCategory } from '../select-category/select-category';

import {  } from ''
@IonicPage()
@Component({
  selector: 'page-add-amount-entry',
  templateUrl: 'add-amount-entry.html',
})
export class AddAmountEntry {

  type : Type;
  observation : string;
  date : string;
  price : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl : AlertController) {
    this.type = navParams.get("type");
    this.date = new Date().toISOString();
    this.price = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAmountEntry');
  }

  gotoSelectingCategoryImage()
  {
    if(this.price && this.date)
    {
      this.navCtrl.push(SelectCategory,{ type: this.type,
                                        price: this.price,
                                        observation: this.observation, 
                                        date: this.date,
                                        accountid: this.navParams.get("selectedaccountid") });   //sending data to next page
    }else{
      this.showAlert("Missing Fields!", "Please fill the missing fields and then try again.","Ok");
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

  onPriceChange(){
    if(this.price){
      //this.price = parseFloat(this.price).toFixed();
    }else
      this.price = 0;
  }
}

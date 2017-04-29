import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AmountEntry } from '../../../models/amountEntry';
import { AmountEntryType } from '../../../models/amountEntry';

import { DBProvider } from '../../../providers/db-provider';

@IonicPage()
@Component({
  selector: 'page-add-revenue',
  templateUrl: 'add-revenue.html',
})
export class AddRevenue {

  public newAmountEntry :  AmountEntry;

  constructor(public navCtrl: NavController,
              private dbprovider : DBProvider, public navParams: NavParams) {
    this.newAmountEntry = new AmountEntry("","",0,AmountEntryType.Revenue,"",new Date(),false,"",""); //creating a new one
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRevenue');
  }

  save(){
      this.dbprovider.addEntry(this.newAmountEntry).then((status)=>{
        //if(status == true)
          this.navCtrl.pop();
      });
  }
}

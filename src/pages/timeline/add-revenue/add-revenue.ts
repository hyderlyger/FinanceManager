import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { financeEntry } from '../../../models/financeEntry';
import { FinanceEntryType } from '../../../models/financeEntry';

@IonicPage()
@Component({
  selector: 'page-add-revenue',
  templateUrl: 'add-revenue.html',
})
export class AddRevenue {
  public financelist:  Array<financeEntry>; //Array<[string,string]>;
  public financeitem :  financeEntry;

  constructor(public navCtrl: NavController, public storage : Storage, public navParams: NavParams) {
    this.financeitem = new financeEntry("","", FinanceEntryType.Revenue,"","","",null); //creating a new one
    
    this.storage.ready().then(() => {
      this.storage.get("finance_entry_list").then( (val) => {
          this.financelist = JSON.parse(val);
          if(this.financelist == null) {
            this.financelist = [];
          }
      })
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRevenue');
  }

  save(){
    if(this.financeitem != null && this.financelist != null) {  //Do Validations Here
            this.financelist.push(this.financeitem);
            this.storage.ready().then(() => {
              this.storage.set("finance_entry_list", JSON.stringify(this.financelist));
              this.navCtrl.pop();
            });
            
        }
  }
}

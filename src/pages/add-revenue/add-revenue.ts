import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { financeEntry } from '../../models/financeEntry';

@IonicPage()
@Component({
  selector: 'page-add-revenue',
  templateUrl: 'add-revenue.html',
})
export class AddRevenue {
  public financelist:  Array<financeEntry>; //Array<[string,string]>;
  financeitem :  financeEntry; //[string,string];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.financelist = JSON.parse(localStorage.getItem("finance_entry_list"));
    if(!this.financelist) {
        this.financelist = [];
    }
    this.financeitem = new financeEntry("","");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRevenue');
  }

  save(){
    if(this.financeitem != null) {
            this.financelist.push(this.financeitem);
            localStorage.setItem("finance_entry_list", JSON.stringify(this.financelist));
            this.navCtrl.pop();
        }
  }
}

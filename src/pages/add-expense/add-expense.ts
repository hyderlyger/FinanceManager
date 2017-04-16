import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { financeEntry } from '../../models/financeEntry';
import { FinanceEntryType } from '../../models/financeEntry';

@IonicPage()
@Component({
  selector: 'page-add-expense',
  templateUrl: 'add-expense.html',
})
export class AddExpense {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.financelist = JSON.parse(localStorage.getItem("finance_entry_list"));
    if(!this.financelist) {
        this.financelist = [];
    }
    this.financeitem = new financeEntry("","", FinanceEntryType.Expense);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddExpense');
  }

  public financelist:  Array<financeEntry>; //Array<[string,string]>;
  financeitem :  financeEntry; //[string,string];

  save(){
    if(this.financeitem != null) {
            this.financelist.push(this.financeitem);
            localStorage.setItem("finance_entry_list", JSON.stringify(this.financelist));
            this.navCtrl.pop();
        }
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { financeEntry } from '../../../models/financeEntry';
import { FinanceEntryType } from '../../../models/financeEntry';

import { DBProvider } from '../../../providers/db-provider'

@IonicPage()
@Component({
  selector: 'page-add-expense',
  templateUrl: 'add-expense.html',
})
export class AddExpense {
  public financeitem :  financeEntry;

  constructor(public navCtrl: NavController,
              private dbprovider : DBProvider, public navParams: NavParams) {

    this.financeitem = new financeEntry("","", FinanceEntryType.Expense,"","","",new Date().toISOString()); //creating a new one

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddExpense');
  }

  save(){
    this.dbprovider.addEntry(this.financeitem).then((status) => {
      //if(status == true)
        this.navCtrl.pop();
    });
  }

}

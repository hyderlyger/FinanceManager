import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AmountEntry } from '../../../models/amountEntry';
import { AmountEntryType } from '../../../models/amountEntry';

import { DBProvider } from '../../../providers/db-provider';

@IonicPage()
@Component({
  selector: 'page-add-expense',
  templateUrl: 'add-expense.html',
})
export class AddExpense {
  public newAmountEntry :  AmountEntry;

  constructor(public navCtrl: NavController,
              private dbprovider : DBProvider, public navParams: NavParams) {

    this.newAmountEntry = new AmountEntry("","",0,AmountEntryType.Expense,"",new Date(),false,"","");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddExpense');
  }

  save(){
    this.dbprovider.addEntry(this.newAmountEntry).then((status) => {
      //if(status == true)
        this.navCtrl.pop();
    });
  }

}

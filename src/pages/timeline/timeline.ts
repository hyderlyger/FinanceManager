import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AddRevenue} from '../add-revenue/add-revenue';
import {AddExpense} from '../add-expense/add-expense';

import { financeEntry } from '../../models/financeEntry';
import { FinanceEntryType } from '../../models/financeEntry';

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class Timeline {
  public financelist: Array<financeEntry>;
  _saldo : number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this._saldo = 0;
  }
  //Overrides
  ionViewDidLoad() {
  }
  ionViewDidEnter(){
    this.refreshlist();
  }

  //UI Events
  addrevenue() {
        this.navCtrl.push(AddRevenue);
    }
  addexpense() {
        this.navCtrl.push(AddExpense);
    }
  delete(index: number) {
      this.financelist.splice(index, 1);
      localStorage.setItem("finance_entry_list", JSON.stringify(this.financelist));
      this.performRefreshAdjustments();
  }

  //Data Manipulations
  refreshlist() {
      this.financelist = JSON.parse(localStorage.getItem("finance_entry_list"));
      if(!this.financelist) //null check i guess
      {
          this.financelist = [];
      }else{

        this.performRefreshAdjustments();
      }
    }
  private performRefreshAdjustments() {
    this.calculateSaldo();
  }
  private calculateSaldo() {
    if(this.financelist != null)
    {
      this._saldo = 0;
        this.financelist.forEach(item => {
          if(item.type == FinanceEntryType.Revenue)
            this._saldo += parseFloat(item.price);
          else
            this._saldo -= parseFloat(item.price);
        });
    }
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {AddRevenue} from '../add-revenue/add-revenue';
import {AddExpense} from '../add-expense/add-expense';
import { Transfer } from '../transfer/transfer'

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

  constructor(public navCtrl: NavController, public storage : Storage, public navParams: NavParams) {
    this._saldo = 0;
  }
  //Overrides
  ionViewDidLoad() {
  }
  ionViewDidEnter(){
    this.refreshlist();
  }

  //UI Events
  goto_addrevenue() {
        this.navCtrl.push(AddRevenue);
    }
  goto_addexpense() {
        this.navCtrl.push(AddExpense);
    }
  goto_transfer(){
        this.navCtrl.push(Transfer);
  }
  delete(index: number) {
    if(this.financelist != null)
    {
      this.financelist.splice(index, 1);
      this.storage.ready().then(() => {
          this.storage.set("finance_entry_list", JSON.stringify(this.financelist));
          this.performRefreshAdjustments();
        });
    }
  }

  //Data Manipulations
  refreshlist() {

      this.storage.ready().then(() => {
        this.storage.get("finance_entry_list").then( (val) => {
            this.financelist = JSON.parse(val);
            if(this.financelist == null) {
              this.financelist = [];
            }else{
              this.performRefreshAdjustments();
            }
        })
      });

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

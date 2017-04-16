import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AddRevenue} from '../add-revenue/add-revenue';
import { financeEntry } from '../../models/financeEntry';

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class Timeline {
  public financelist: Array<financeEntry>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
  }

  ionViewDidEnter(){
    this.refreshlist();
  }

  add() {
        this.navCtrl.push(AddRevenue);
    }

  delete(index: number) {
      this.financelist.splice(index, 1);
      localStorage.setItem("finance_entry_list", JSON.stringify(this.financelist));
      //this.refreshlist();
  }

  refreshlist() {
      this.financelist = JSON.parse(localStorage.getItem("finance_entry_list"));
      if(!this.financelist) //null check i guess
      {
          this.financelist = [];
      }
    }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AddRevenue} from '../add-revenue/add-revenue';
import {AddExpense} from '../add-expense/add-expense';
import { Transfer } from '../transfer/transfer'

//import { AmountEntry } from '../../../models/financeEntry';
import { AmountEntryType } from '../../../models/amountEntry';
import { Account } from '../../../models/account';

import { PopoverController } from 'ionic-angular';
import { PopoverAccountSelect } from '../../../components/popover-account-select/popover-account-select';

import { DBProvider } from '../../../providers/db-provider';
import { ImagesProvider } from '../../../providers/images-provider';

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class Timeline {

  constructor(public navCtrl: NavController,private popoverCtrl: PopoverController, 
              private dbprovider : DBProvider, private imageprovider : ImagesProvider, public navParams: NavParams) {
  }

  //Overrides
  ionViewDidLoad() {
  }
  ionViewDidEnter(){
  }

  //PopOver
  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverAccountSelect);
    popover.present({
      ev: ev
    });
    popover.onDidDismiss((popoverData : number) => {
        this.dbprovider.UpdateSelectedAccount(popoverData);
    });
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
    this.dbprovider.deleteEntry(index).then((status)=> {
      //when done
    });
  }
}

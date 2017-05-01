import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddAmountEntry } from '../add-amount-entry/add-amount-entry';
import { Transfer } from '../transfer/transfer'

//import { AmountEntry } from '../../../models/financeEntry';
import { Type } from '../../../models/enums';
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
              private dbprovider : DBProvider, private imagesprovider : ImagesProvider, public navParams: NavParams) {
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
        this.navCtrl.push(AddAmountEntry,{type : Type.Revenue, selectedaccountid: this.dbprovider.selectedAccount.id});
    }
  goto_addexpense() {
        this.navCtrl.push(AddAmountEntry,{type : Type.Expense, selectedaccountid: this.dbprovider.selectedAccount.id});
    }
  goto_transfer(){
        this.navCtrl.push(Transfer);
  }
  delete(id: string) {
    this.dbprovider.deleteEntry(id).then((status)=> {
      //when done
    });
  }
}

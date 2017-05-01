import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddAmountEntry } from '../add-amount-entry/add-amount-entry';
import { Transfer } from '../transfer/transfer'

import { Type } from '../../../models/enums';
import { Account } from '../../../models/account';
import { AmountEntry } from '../../../models/amountEntry';

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

  //_selectedAccountImageSource : string;
  _selectedAccount : Account;
  _amountEntries : Array<AmountEntry> = [];
  _balance : number;
  constructor(public navCtrl: NavController,private popoverCtrl: PopoverController, 
              private dbprovider : DBProvider, private imagesprovider : ImagesProvider, public navParams: NavParams) {
                this.updateUIData();
  }

  //Overrides
  ionViewDidLoad() {
  }
  ionViewCanEnter(){ //every time gets active
    console.log("Timeline - ionViewCanEnter");
    this.updateUIData();
  }

  //UI Data Updates
  private updateUIData()
  {
    this._selectedAccount = this.dbprovider.selectedAccount;
    this._amountEntries = this.dbprovider.amountEntries;
    this._balance = this.dbprovider.balance;
  }

  //PopOver
  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverAccountSelect);
    popover.present({
      ev: ev
    });
    popover.onDidDismiss((accountid : string) => {
        this.dbprovider.UpdateSelectedAccount(accountid);
        this.updateUIData()
    });
  }
  
  //UI Events
  goto_addrevenue() {
        this.navCtrl.push(AddAmountEntry,{type : Type.Revenue, selectedaccountid: this._selectedAccount.id});
    }
  goto_addexpense() {
        this.navCtrl.push(AddAmountEntry,{type : Type.Expense, selectedaccountid: this._selectedAccount.id});
    }
  goto_transfer(){
        this.navCtrl.push(Transfer);
  }
  delete(id: string) {
    this.dbprovider.deleteEntry(id).then((status)=> {
      this.updateUIData();
    });
  }
}

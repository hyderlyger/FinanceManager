import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { MenuPanel } from '../../sidemenu/menu-panel/menu-panel';
import { AddAmountEntry } from '../add-amount-entry/add-amount-entry';
import { Transfer } from '../transfer/transfer'

import { Type } from '../../../models/enums';
import { EventType } from '../../../models/enums';

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

  constructor(public navCtrl: NavController,private popoverCtrl: PopoverController, private events : Events, 
              private dbprovider : DBProvider, private imagesprovider : ImagesProvider, public navParams: NavParams) {

                this.events.subscribe(this.dbprovider.event_MenuEvent,(eventtype : EventType)=>{
                  switch(eventtype){
                    case EventType.OpenMenuPanel:
                      this.navCtrl.push(MenuPanel);
                      break;
                    default:
                      break;
                  }
                });
  }

  //Overrides
  ionViewDidLoad() {
  }
  ionViewCanEnter(){ //every time gets active
    console.log("Timeline - ionViewCanEnter");
  }

  //PopOver
  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverAccountSelect);
    popover.present({
      ev: ev
    });
    popover.onDidDismiss((accountid : string) => {
        this.dbprovider.UpdateSelectedAccount(accountid);
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

    });
  }
  toggleSubGroupVisibility(groupid, subgroupid){
    this.dbprovider.toggleSubGroupItemVisibility(groupid, subgroupid);
  }
}

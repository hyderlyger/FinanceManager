import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, PopoverController, AlertController } from 'ionic-angular';

import { MenuPanel } from '../../sidemenu/menu-panel/menu-panel';
import { AddAmountEntry } from '../add-amount-entry/add-amount-entry';

import { Type } from '../../../models/enums';
import { EventType } from '../../../models/enums';

import { PopoverAccountSelect } from '../../../components/popover-account-select/popover-account-select';

import { DBProvider } from '../../../providers/db-provider';
import { ImagesProvider } from '../../../providers/images-provider';


@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class Timeline {
filterdate : string;
filterdateRaw : Date;
isfilterdateActive : Boolean;

  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController, private events : Events, 
              private dbprovider : DBProvider, private imagesprovider : ImagesProvider, public navParams: NavParams,
              private alertCtrl : AlertController) {

                this.filterdateRaw = new Date();
                this.filterdate = this.filterdateRaw.toISOString();
                this.isfilterdateActive = false;

                //Event that listens to fullscreen Side Menu Page Changes
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
      if(accountid)
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
      if(this.dbprovider.accounts.length>=2){
        this.navCtrl.push(AddAmountEntry,{type : Type.Transfer, selectedaccountid: this.dbprovider.selectedAccount.id});
      }else{
        this.showAlert("Unavailable","You must have atleast 2 accounts to use this feature","Ok");
      }
    }
  delete(id: string) {
    this.dbprovider.deleteEntry(id).then((status)=> {

    });
  }
  toggleSubGroupVisibility(groupid, subgroupid){
    this.dbprovider.toggleSubGroupItemVisibility(groupid, subgroupid);
  }
  showAlert(title: string, subTitle: string, buttonText : string){
    var alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [buttonText]
      });
    alert.present();
  }
  onfilterdateChange(val){
    this.filterdate = val;
    this.filterdateRaw = new Date(val);
    this.isfilterdateActive = true;
  }
}

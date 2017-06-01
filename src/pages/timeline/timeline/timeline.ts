import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, PopoverController, AlertController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

//Language
import moment from 'moment';
import 'moment/locale/pt-br';

import { MenuPanel } from '../../sidemenu/menu-panel/menu-panel';
import { AddEditAccount } from '../../sidemenuextra/add-edit-account/add-edit-account';
import { AddEditCategory } from '../../sidemenuextra/add-edit-category/add-edit-category';
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
filterdate : number;
filterdateRaw : Date;
isfilterdateActive : Boolean;

  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController, private events : Events, 
              private dbprovider : DBProvider, private imagesprovider : ImagesProvider, public navParams: NavParams,
              private alertCtrl : AlertController, private datePicker: DatePicker) {

                this.filterdateRaw = new Date();
                this.filterdate = this.filterdateRaw.getDate();
                this.isfilterdateActive = false;

                this.listenToPageEvents(); //Event that listens to fullscreen Side Menu Page Changes

                moment().locale('pt-br'); //Portugese language
  }

  //EventListning 
  listenToPageEvents(){ //Event that listens to fullscreen Side Menu Page Changes
    
    this.events.subscribe(this.dbprovider.event_MenuEvent,(eventtype : EventType, args)=>{
      switch(eventtype){
        case EventType.OpenMenuPanel:
          this.navCtrl.push(MenuPanel);
          break;
        case EventType.OpenAddEditAccount:
          this.navCtrl.push(AddEditAccount, args);
          break;
        case EventType.OpenAddEditCategory:
          this.navCtrl.push(AddEditCategory, args);
          break;
        default:
          break;
      }
    });
  }
  //Overrides
  ionViewDidLoad() {
    this.isfilterdateActive = false; // resetting
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
        //this.showAlert("Unavailable","You must have atleast 2 accounts to use this feature","Ok");
        this.showAlert("Indisponível","Você deve ter ao menos 2 contas para usar esse recurso","Ok");
      }
    }
  delete(id: string) {
    this.dbprovider.deleteEntry(id).then((status)=> {
      //nothing here yet
    });
  }
  toggleSubGroupVisibility(groupid, subgroupid){
    this.dbprovider.toggleSubGroupItemVisibility(groupid, subgroupid);
  }
  showDatePicker(){
    this.datePicker.show({
          date: new Date(),
          mode: 'date',
          androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
          date => {
              this.onfilterdateChange(date);
          }, err =>{

          }
      );
  }
  onfilterdateChange(val){
    if(val){
      this.filterdateRaw = new Date(val);
      this.filterdate = this.filterdateRaw.getDate();
      this.isfilterdateActive = true;
    }
  }
  getDateinPortugese(date : string)
  {
    return moment(date).format("dddd, DD MMMM YYYY"); //https://momentjs.com/
  }
  showAlert(title: string, subTitle: string, buttonText : string){
    var alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [buttonText]
      });
    alert.present();
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { DBProvider} from '../../../providers/db-provider';
import { ImagesProvider} from '../../../providers/images-provider';
import { Account } from '../../../models/account';
import { EventType } from '../../../models/enums';

@IonicPage()
@Component({
  selector: 'page-menu-accounts',
  templateUrl: 'menu-accounts.html',
})
export class MenuAccounts {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private events : Events,
              private dbprovider : DBProvider, private imageprovider : ImagesProvider,
              private menuCtrl : MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuAccounts');
  }
  ionViewWillEnter(){ //every time gets active

  }
  addAccountPage(){
    this.events.publish(this.dbprovider.event_MenuEvent,EventType.OpenAddEditAccount); //asking root timeline to open Page
    this.menuCtrl.close();
  }
  editAccountPage(accountid : string){
    this.events.publish(this.dbprovider.event_MenuEvent,EventType.OpenAddEditAccount,{selectedAccountIDforEdit : accountid}); //asking root timeline to open Page
    this.menuCtrl.close();
  }
  
}

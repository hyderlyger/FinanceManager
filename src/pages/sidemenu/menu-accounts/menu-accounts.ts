import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController, AlertController } from 'ionic-angular';
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
              private menuCtrl : MenuController, private alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuAccounts');
  }
  ionViewWillEnter(){ //every time gets active

  }
  addAccountPage(){
    if(this.dbprovider.isUserAccessLevelPreminum){
      this.events.publish(this.dbprovider.event_MenuEvent,EventType.OpenAddEditAccount); //asking root timeline to open Page
      this.menuCtrl.close();
    }else{
      //this.showAlert("Access Denied","Get Premium version to use this feature.","Ok");
      this.showAlert("Acesso negado","Obtenha uma versão premium para usar esse recurso.","Ok");
    }
  }
  editAccountPage(accountid : string){
      this.events.publish(this.dbprovider.event_MenuEvent,EventType.OpenAddEditAccount,{selectedAccountIDforEdit : accountid}); //asking root timeline to open Page
      this.menuCtrl.close();
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

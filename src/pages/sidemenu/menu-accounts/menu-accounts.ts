import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DBProvider} from '../../../providers/db-provider';
import { ImagesProvider} from '../../../providers/images-provider';
import { Account } from '../../../models/account';

@IonicPage()
@Component({
  selector: 'page-menu-accounts',
  templateUrl: 'menu-accounts.html',
})
export class MenuAccounts {
  _accounts : Array<Account> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dbprovider : DBProvider, private imageprovider : ImagesProvider) {
                this.ionViewWillEnter();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuAccounts');
  }
  ionViewWillEnter(){ //every time gets active
    this._accounts = this.dbprovider.accounts;
  }
  goback(){
    this.navCtrl.pop();
  }
}

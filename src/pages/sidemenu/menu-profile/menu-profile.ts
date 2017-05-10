import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DBProvider } from '../../../providers/db-provider'

@IonicPage()
@Component({
  selector: 'page-menu-profile',
  templateUrl: 'menu-profile.html',
})
export class MenuProfile {
  _username : string;
  _email : string;
  _actualpass : string;
  _newpass : string;
  _newpass2 : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dbprovider : DBProvider) {
    this._username = "";
    this._email = "";
    this._actualpass = "";
    this._newpass = "";
    this._newpass2 = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuProfile');

    this._username = this.dbprovider.user.name;
    this._email = this.dbprovider.user.email;
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Category } from '../../../models/category';

import { DBProvider } from '../../../providers/db-provider';
import { ImagesProvider } from '../../../providers/images-provider';

@IonicPage()
@Component({
  selector: 'page-menu-categories',
  templateUrl: 'menu-categories.html',
})
export class MenuCategories {
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dbprovider : DBProvider, private imageprovider : ImagesProvider) {
                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuCategories');
  }
  ionViewWillEnter(){ //every time gets active
  }
  goback(){
    this.navCtrl.pop();
  }
}

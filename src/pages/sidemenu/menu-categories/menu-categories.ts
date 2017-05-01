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
  _categories : Array<Category> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dbprovider : DBProvider, private imageprovider : ImagesProvider) {
                this.ionViewWillEnter();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuCategories');
  }
  ionViewWillEnter(){ //every time gets active
    this._categories = this.dbprovider.categories;
  }
  goback(){
    this.navCtrl.pop();
  }
}

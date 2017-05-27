import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';

import { Category } from '../../../models/category';

import { DBProvider } from '../../../providers/db-provider';
import { ImagesProvider } from '../../../providers/images-provider';

import { EventType } from '../../../models/enums';

@IonicPage()
@Component({
  selector: 'page-menu-categories',
  templateUrl: 'menu-categories.html',
})
export class MenuCategories {
  constructor(public navCtrl: NavController, public navParams: NavParams, private events : Events,
              private dbprovider : DBProvider, private imageprovider : ImagesProvider,
              private menuCtrl : MenuController) {
                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuCategories');
  }
  ionViewWillEnter(){ //every time gets active
  }
  newCategoryPage(){
    this.events.publish(this.dbprovider.event_MenuEvent,EventType.OpenAddEditCategory); //asking root timeline to open Page
    this.menuCtrl.close();
  }
}

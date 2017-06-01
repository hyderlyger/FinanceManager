import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController, AlertController} from 'ionic-angular';

import { Category } from '../../../models/category';

import { DBProvider } from '../../../providers/db-provider';
import { ImagesProvider } from '../../../providers/images-provider';

import { EventType } from '../../../models/enums';
import { Type } from '../../../models/enums';

@IonicPage()
@Component({
  selector: 'page-menu-categories',
  templateUrl: 'menu-categories.html',
})
export class MenuCategories {
  constructor(public navCtrl: NavController, public navParams: NavParams, private events : Events,
              private dbprovider : DBProvider, private imageprovider : ImagesProvider,
              private menuCtrl : MenuController, private alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuCategories');
  }
  ionViewWillEnter(){ //every time gets active
  }
  addCategoryPage(_type : Type){
    if(this.dbprovider.isUserAccessLevelPreminum){
      this.events.publish(this.dbprovider.event_MenuEvent,EventType.OpenAddEditCategory, {type: _type }); //asking root timeline to open Page
      this.menuCtrl.close();
    }else{
      //this.showAlert("Access Denied","Get Premium version to use this feature.","Ok");
      this.showAlert("Acesso negado","Obtenha uma versão premium para usar esse recurso.","Ok");
    }
  }
  editCategoryPage(categotyid : string, _type : Type){
    this.events.publish(this.dbprovider.event_MenuEvent,EventType.OpenAddEditCategory,{selectedCategoryIDforEdit : categotyid, type: _type }); //asking root timeline to open Page
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

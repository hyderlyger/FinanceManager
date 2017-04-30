import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 import { UUID } from 'angular2-uuid';

import { AmountEntry } from '../../../models/amountEntry';
import { Type } from '../../../models/enums';

import { DBProvider } from '../../../providers/db-provider';
import { ImagesProvider } from '../../../providers/images-provider';

@IonicPage()
@Component({
  selector: 'page-select-category',
  templateUrl: 'select-category.html',
})
export class SelectCategory {
  type : Type;
  selectedCategoryid : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private dbprovider : DBProvider, private imageprovider : ImagesProvider) {

                this.type = navParams.get("type");

                if(dbprovider.categories.find(item => item.type == this.type))
                  this.selectedCategoryid = dbprovider.categories.find(item => item.type == this.type).id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCategory');
  }
  updateSelection(index : number)
  {
    this.selectedCategoryid =  this.dbprovider.categories[index].id;
  }
  saveEntry()
  {
    if(this.selectedCategoryid)
    {
      this.dbprovider.addEntry(new AmountEntry( UUID.UUID(),
                                                this.navParams.get("price"),
                                                this.type,
                                                this.navParams.get("observations"),
                                                this.navParams.get("date"),
                                                false,  //not a system entry
                                                this.navParams.get("accountid"),
                                                this.selectedCategoryid ));

                                                this.navCtrl.popToRoot();
    }
  }
}

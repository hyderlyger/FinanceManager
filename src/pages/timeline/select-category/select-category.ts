import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 import { UUID } from 'angular2-uuid';

import { AmountEntry } from '../../../models/amountEntry';
import { Category } from '../../../models/category'
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

  _categories : Array<Category>;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private dbprovider : DBProvider, private imageprovider : ImagesProvider) {

                this.type = navParams.get("type");
                this.ionViewWillEnter();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCategory');
  }
  ionViewWillEnter(){ //every time gets active
    this._categories = this.dbprovider.categories;

    if(this._categories.find(item => item.type == this.type))
      this.selectedCategoryid = this._categories.find(item => item.type == this.type).id;
  }
  updateSelection(index : number)
  {
    this.selectedCategoryid =  this._categories[index].id;
  }
  saveEntry()
  {
    if(this.selectedCategoryid)
    {
      this.dbprovider.addEntry(new AmountEntry( UUID.UUID(),
                                                this.navParams.get("price"),
                                                this.type,
                                                this.navParams.get("observations"),
                                                new Date(this.navParams.get("date")),
                                                false,  //not a system entry
                                                this.navParams.get("accountid"),
                                                this.selectedCategoryid ));
                                                this.navCtrl.popToRoot();
    }
  }
}

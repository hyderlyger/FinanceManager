import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Category } from '../../../models/category';
import { DBProvider } from '../../../providers/db-provider';
import { ImagesProvider } from '../../../providers/images-provider';
import { Type } from '../../../models/enums';
@IonicPage()
@Component({
  selector: 'page-add-edit-category',
  templateUrl: 'add-edit-category.html',
})
export class AddEditCategory {
  _category : Category = new Category("","",0,Type.Revenue,false);
  _categoryImagesArray : Array<string>= [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbprovider : DBProvider,
              private imageprovider : ImagesProvider, private alertCtrl : AlertController) {
                this._category.type = this.navParams.get("type");
                this._category.id = this.navParams.get("selectedCategoryIDforEdit");  //would be null in case of new account
                this._categoryImagesArray = this.imageprovider.getUseableCategoryImages(this._category.type);
                
                if(this.dbprovider.categories.length>0) //categories exist
                {
                  if(this._category.id){ //Edit
                    let matchedcategory = this.dbprovider.categories.find(item => item.id == this._category.id);
                    this._category = matchedcategory; //check if shallow or deep copy

                  }else{  //Add New
                    this._category.id = "";
                    this._category.imageindex = 0;  //first img
                    this._category.issystem = false;
                    this._category.subject = "";
                  }
                }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEditCategory');
  }
  updateSelection(imgindex : number){
    this._category.imageindex = imgindex;
  }

  saveEntry()
  {
    if( this._category.imageindex && this._category.subject ){  //Edit Case

        this.dbprovider.addOrUpdateCategory(this._category).then(result=>{
        this.navCtrl.popToRoot();
      });
    }else{
      //this.showAlert("Error","All fields are required.","Ok");
      this.showAlert("Erro","Todos os campos são necessários.","Ok");
    }
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

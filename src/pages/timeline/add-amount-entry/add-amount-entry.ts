import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Type } from '../../../models/enums';
import { AlertController } from 'ionic-angular';
import { SelectCategory } from '../select-category/select-category';

import {  } from ''
@IonicPage()
@Component({
  selector: 'page-add-amount-entry',
  templateUrl: 'add-amount-entry.html',
})
export class AddAmountEntry {

  type : Type;
  observation : string;
  date : string;
  price : number;

  //Calculator stuff
  operation : string;
  previousPrice : number;
  ispoint : Boolean;
  _calculatorItems = [ "1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "x", ".", "0", "=", "/"  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl : AlertController) {
    this.type = navParams.get("type");
    this.date = new Date().toISOString();
    this.price = 0;
    this.previousPrice = 0;
    this.ispoint = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAmountEntry');
  }

  gotoSelectingCategoryImage()
  {
    if(this.price && this.date && this.price >0)
    {
      this.navCtrl.push(SelectCategory,{ type: this.type,
                                        price: this.price,
                                        observation: this.observation, 
                                        date: this.date,
                                        accountid: this.navParams.get("selectedaccountid") });   //sending data to next page
    }else{
      this.showAlert("Missing Field!", "The price must be positive and non-zero","Got It!");
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
  performOperation(item){
    switch(item)
    {
      case "<": //remove
        this.setCalculatorVariablestoDefault();
        break;
      case ".": //point
        this.ispoint = true;
        break;
      case "+": //add
        if(this.operation)
          this.calculate();
        this.startNewOperation(item);
        break;
      case "-": //point
        if(this.operation)
          this.calculate();
        this.startNewOperation(item);
        break;
      case "x": //point
        if(this.operation)
          this.calculate();
        this.startNewOperation(item);
        break;
      case "/": //point
        if(this.operation)
          this.calculate();
        this.startNewOperation(item);
        break;
      case "=":
        if(this.operation)
          this.calculate();
        break;
      default:
        if(this.ispoint == true){  //point case
          this.price = parseFloat(this.price.toString() + "." + item);
          if(item != "0") //case when user presses 0 after point
            this.ispoint = false;
        }
        else
          this.price = parseFloat(this.price.toString() + item);
        break;
    }
  }
  private calculate(){
    try{
      switch(this.operation){
        case "+": 
          this.price = this.previousPrice + this.price;
          break;
        case "-": //point
          this.price = this.previousPrice - this.price;
          break;
        case "x": //point
          this.price = this.previousPrice * this.price;
          break;
        case "/": //point
          this.price = this.previousPrice / this.price;
          break;
        default:
          break;
      }
      this.operation = "";
      
    }catch(ex)  //exception case
    {
      this.setCalculatorVariablestoDefault();
    }
  }
  private startNewOperation(item){
    this.operation = item;
    this.previousPrice = this.price;
    this.price = 0;
    this.ispoint = false;
  }
  private setCalculatorVariablestoDefault(){
    this.price = 0;
    this.previousPrice = 0;
    this.operation = "";
    this.ispoint = false;
  }
}

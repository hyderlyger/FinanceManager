import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Type } from '../../../models/enums';
import { AlertController } from 'ionic-angular';
import { SelectCategory } from '../select-category/select-category';
import { Transfer } from '../transfer/transfer';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-add-amount-entry',
  templateUrl: 'add-amount-entry.html',
})
export class AddAmountEntry {

  type : Type;
  observation : string;
  date : Date;
  price : number;

  //Calculator stuff
  operation : string;
  previousPrice : number;
  ispoint : Boolean;
  _calculatorItems = [ "1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "x", ".", "0", "=", "/"  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl : AlertController,
              private datePicker: DatePicker) {
    this.type = navParams.get("type");
    this.date = new Date();
    this.price = 0;
    this.previousPrice = 0;
    this.ispoint = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAmountEntry');
  }

  gotoNextPage()
  {
    if(this.price && this.date && this.price >0)
    {
      if(this.type == Type.Transfer){
        this.navCtrl.push(Transfer,{type: this.type,
                                    price: this.price,
                                    observation: this.observation, 
                                    date: this.date,
                                    accountid: this.navParams.get("selectedaccountid") });   //sending data to next page
      }else{
        this.navCtrl.push(SelectCategory,{type: this.type,
                                          price: this.price,
                                          observation: this.observation, 
                                          date: this.date,
                                          accountid: this.navParams.get("selectedaccountid") });   //sending data to next page
      }
    
    }else{
        //this.showAlert("Missing Field!", "The price must be positive and non-zero","Got It!");
        this.showAlert("Campo perdido!", "O preço deve ser positivo e não-zero","Ok");
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

  showDatePicker(){
    this.datePicker.show({
          date: new Date(),
          mode: 'date',
          androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
          date => {
              this.ondateChange(date);
          }, err =>{

          }
      );
  }
  ondateChange(val){
    if(val){
      this.date = new Date(val);
    }
  }
}

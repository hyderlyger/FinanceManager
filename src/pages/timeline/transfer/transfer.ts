import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { UUID } from 'angular2-uuid';

import { AmountEntry } from '../../../models/amountEntry';
import { Account } from '../../../models/account';
import { Type } from '../../../models/enums';

import { DBProvider } from '../../../providers/db-provider';
import { ImagesProvider } from '../../../providers/images-provider';

import { PopoverAccountSelect } from '../../../components/popover-account-select/popover-account-select';

@IonicPage()
@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
})
export class Transfer {

  type : Type;
  selectedAccountFrom : Account;
  selectedAccountTo : Account;
  price : Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl : AlertController,
              private dbprovider : DBProvider, private imageprovider : ImagesProvider,
              private popoverCtrl: PopoverController) {

                this.price = this.navParams.get("price");
                this.type = navParams.get("type");
                this.selectedAccountFrom = this.dbprovider.getAccountbyID(this.navParams.get("accountid"));
                this.selectedAccountTo = this.dbprovider.getDistinctAccountOtherthantheMentionedID(this.navParams.get("accountid"));
                
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Transfer');
  }

  //PopOvers
  presentPopover_AccountExpense(ev) {
    let popover = this.popoverCtrl.create(PopoverAccountSelect);
    popover.present({
      ev: ev
    });
    popover.onDidDismiss((accountid : string) => {
      if(accountid)
        this.selectedAccountFrom = this.dbprovider.getAccountbyID(accountid);
    });
  }
  presentPopover_AccountRevenue(ev) {
    let popover = this.popoverCtrl.create(PopoverAccountSelect);
    popover.present({
      ev: ev
    });
    popover.onDidDismiss((accountid : string) => {
      if(accountid)
        this.selectedAccountTo = this.dbprovider.getAccountbyID(accountid);
    });
  }

  showAlert(title: string, subTitle: string, buttonText : string){
    var alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [buttonText]
      });
    alert.present();
  }
  saveEntry()
  {
    if(this.selectedAccountFrom && this.selectedAccountTo) {
      if(this.selectedAccountFrom != this.selectedAccountTo){
        
        var TransferExpenseEntry : AmountEntry = new AmountEntry( UUID.UUID(),
                                                  this.navParams.get("price"),
                                                  Type.Expense,
                                                  this.navParams.get("observations") == true ? this.navParams.get("observations") : "",
                                                  new Date(this.navParams.get("date")),
                                                  true,  //a system entry
                                                  this.selectedAccountFrom.id,
                                                  this.dbprovider.getCategoryIDforTransfer(Type.Expense) );

        var TransferRevenueEntry : AmountEntry = new AmountEntry( UUID.UUID(),
                                                  this.navParams.get("price"),
                                                  Type.Revenue,
                                                  this.navParams.get("observations") == true ? this.navParams.get("observations") : "",
                                                  new Date(this.navParams.get("date")),
                                                  true,  //a system entry
                                                  this.selectedAccountTo.id,
                                                  this.dbprovider.getCategoryIDforTransfer(Type.Revenue) );

        Promise.all([ this.dbprovider.addEntry(TransferRevenueEntry),
                      this.dbprovider.addEntry(TransferExpenseEntry) ]).then(()=>{

                        this.navCtrl.popToRoot();
                      });
      }else{
        //this.showAlert("Conflict", "The selected accounts can not be identical.", "Ok");
        this.showAlert("Conflito", "As contas selecionadas não podem ser idênticas.", "Ok");
      }
    }else{
      //this.showAlert("Missing Fields", "All fields are required", "Ok");
      this.showAlert("Campos perdidos", "Todos os campos são necessários.", "Ok");
    }
  }
}

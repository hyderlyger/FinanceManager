import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { UUID } from 'angular2-uuid';
//Models
import { User } from '../models/user';
import { Account } from '../models/account';
import { Category } from '../models/category';
import { CategoryType } from '../models/category';
import { AmountEntry } from '../models/amountEntry';
import { AmountEntryType } from '../models/amountEntry';
//Providers
import { ImagesProvider } from '../providers/images-provider'

@Injectable()
export class DBProvider {
  
  //Database Constants
  //private db_userinfo = "UserInfo";
  private db_data = "AppData";  //temperary
  private db_user = "DBUser";
  private db_accounts = "DBAccounts";
  private db_categories = "DBCategories";
  private db_ammountenteries = "DBAmmountEnteries";


  //public data
  public user: User;
  public accounts: Array<Account>;
  public categories: Array<Category>;
  public amountEntries: Array<AmountEntry>;
  public balance : number;

  constructor(private storage : Storage) {
    console.log('Hello DBProvider Provider');

    let uuid = UUID.UUID();

    //TODO - Eliminate Storage ready checks 
    this.getLatestTimeLineList();
    this.balance = 0;
  }

  //add
  addEntry(financeitem : AmountEntry)  //it is prefered to return all elements seperated
  {
    return new Promise((resolve)=> {
      if(financeitem != null && this.amountEntries != null) {  //Do Validations Here
          //test
          //for(var i =0; i<500; i++)
          //{
            this.amountEntries.push(financeitem);
          //}
            
            this.storage.ready().then(() => {
              this.storage.set(this.db_data, JSON.stringify(this.amountEntries));
              this.calculateBalance();
              resolve(true);
            });
        }
    });
  }

  //delete
  deleteEntry(index: number) {
    return new Promise((resolve)=> {
      if(this.amountEntries != null)
      {
        this.amountEntries.splice(index, 1);
        this.storage.ready().then(() => {
            this.storage.set(this.db_data, JSON.stringify(this.amountEntries));
            this.calculateBalance();
            resolve(true);
          });
      }
    });
  }

  //retrieve
  getLatestTimeLineList()
  {
      this.storage.ready().then(() => {
        this.storage.get(this.db_data).then( (val) => {
            this.amountEntries = JSON.parse(val);
            if(this.amountEntries == null) {
              this.amountEntries = [];
            }else{
              this.calculateBalance()
            }
        })
      });
  }

  //Helping Functions
  private calculateBalance() {
    if(this.amountEntries != null)
    {
      this.balance = 0;
        this.amountEntries.forEach(item => {
          if(item.type == AmountEntryType.Revenue)
            this.balance += parseFloat(item.price);
          else
            this.balance -= parseFloat(item.price);
        });
    }
  }
}

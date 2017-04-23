import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { financeEntry } from '../models/financeEntry';
import { FinanceEntryType } from '../models/financeEntry';

@Injectable()
export class DBProvider {
  
  //Database Constants
  private db_userinfo = "UserInfo";
  private db_data = "AppData";

  //public data
  public timelinelist: Array<financeEntry>;
  public balance : number;

  constructor(private storage : Storage) {
    console.log('Hello DBProvider Provider');

    //TODO - Eliminate Storage ready checks 
    this.getLatestTimeLineList();
    this.balance = 0;
  }

  //add
  addEntry(financeitem : financeEntry)  //it is prefered to return all elements seperated
  {
    return new Promise((resolve)=> {
      if(financeitem != null && this.timelinelist != null) {  //Do Validations Here
            this.timelinelist.push(financeitem);
            this.storage.ready().then(() => {
              this.storage.set(this.db_data, JSON.stringify(this.timelinelist));
              this.calculateBalance();
              resolve(true);
            });
        }
    });
  }

  //delete
  deleteEntry(index: number) {
    return new Promise((resolve)=> {
      if(this.timelinelist != null)
      {
        this.timelinelist.splice(index, 1);
        this.storage.ready().then(() => {
            this.storage.set(this.db_data, JSON.stringify(this.timelinelist));
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
            this.timelinelist = JSON.parse(val);
            if(this.timelinelist == null) {
              this.timelinelist = [];
            }else{
              this.calculateBalance()
            }
        })
      });
  }

  //Helping Functions
  private calculateBalance() {
    if(this.timelinelist != null)
    {
      this.balance = 0;
        this.timelinelist.forEach(item => {
          if(item.type == FinanceEntryType.Revenue)
            this.balance += parseFloat(item.price);
          else
            this.balance -= parseFloat(item.price);
        });
    }
  }
}

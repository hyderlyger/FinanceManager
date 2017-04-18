import { Storage } from '@ionic/storage';

export class financeEntry {
    public constructor( public name : string, public price: string, public type: FinanceEntryType, public accountID : string, 
                        public notes : string, public categoryID : string, public timestamp : Date ){
                            timestamp = new Date(); //Current Date Time     
    }
    /*public promiseExample(storage : Storage) : any {
        return storage.ready().then(() => {
                storage.get("finance_entry_list").then( (val) => {
                    let list = JSON.parse(val);
                    return list;
                })
            });
    }*/
    public promiseExample(storage : Storage) {
        return new Promise(resolve =>{
            storage.ready().then(() => {
                storage.get("finance_entry_list").then( (val) => {
                    let list = JSON.parse(val);
                    resolve(list);
                })
            });
        });
    }
    /*getProfile(): any {
   return this.local.get("user-profile").then((profile) => {
      var val = JSON.parse(profile);
      return val;
   });
    ngOnInit(): any {
    this._currentUser.getProfile().then(
        value => { console.log(value) }
    )
    }*/
    
}
export enum FinanceEntryType {
    Revenue = 1,
    Expense
}
import { Storage } from '@ionic/storage';

export class financeEntry {
    public constructor( public name : string, public price: string, public type: FinanceEntryType, public accountID : string, 
                        public notes : string, public categoryID : string, public timestamp : Date ){
                            timestamp = new Date(); //Current Date Time     
    }
}
export enum FinanceEntryType {
    Revenue = 1,
    Expense
}
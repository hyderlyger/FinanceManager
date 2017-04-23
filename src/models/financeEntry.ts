export class financeEntry {
    public constructor( public name : string, public price: string, public type: FinanceEntryType, public accountID : string, 
                        public notes : string, public categoryID : string, public timestamp : string ){
    }
}
export enum FinanceEntryType {
    Revenue = 1,
    Expense
}
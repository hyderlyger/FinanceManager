export class financeEntry {
    public constructor( public name : string, public price: string, public type: FinanceEntryType ){
    }
}
export enum FinanceEntryType {
    Revenue = 1,
    Expense
}
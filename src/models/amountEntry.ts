export class AmountEntry {
    public constructor( public id : string, 
                        public subject : string,
                        public price: string,
                        public type: AmountEntryType,
                        public observation : string,//notes
                        public timestamp : string,  
                        public issystem : boolean,  //for transfers
                        public accountID : string, 
                        public categoryID : string )
                        {
                            

    }
}
export enum AmountEntryType {
    Revenue = 1,
    Expense
}
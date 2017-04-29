export class AmountEntry {
    public constructor( public id : string, 
                        public subject : string,
                        public price: number,
                        public type: AmountEntryType,
                        public observation : string,//notes
                        public timestamp : Date,  
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
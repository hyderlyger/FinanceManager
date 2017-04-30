import { Type } from './enums'

export class AmountEntry {
    public constructor( public id : string,
                        public price: number,
                        public type: Type,
                        public observation : string,//notes
                        public timestamp : Date,  
                        public issystem : boolean,  //for transfers
                        public accountID : string, 
                        public categoryID : string )
                        {
                            

    }
}
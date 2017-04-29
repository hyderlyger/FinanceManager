export class Account {
    public constructor( public id : string, 
                        public subject : string,
                        public imageindex: number,
                        public initialdate : Date,  
                        public issystem : boolean,  //for transfers
                        public startingbalance : number )
                        {
                            

    }
}
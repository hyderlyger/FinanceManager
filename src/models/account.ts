export class Account {
    public constructor( public id : string, 
                        public subject : string,
                        public imageindex: number,
                        public initialdate : string,  
                        public issystem : boolean,  //for transfers
                        public startingbalance : string )
                        {
                            

    }
}
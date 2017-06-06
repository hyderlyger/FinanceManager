export class Account {
    public constructor( public id : string, 
                        public subject : string,
                        public imageindex: number,
                        public initialdate : Date,  
                        public issystem : boolean,  //for transfers
                        public startingbalance : number )
                        {
    }
    
    clone( obj : Account){
        this.id = obj.id;
        this.subject = obj.subject;
        this.imageindex = obj.imageindex;
        this.issystem = obj.issystem;
        this.startingbalance = obj.startingbalance;
        this.initialdate = obj.initialdate;
    }
}
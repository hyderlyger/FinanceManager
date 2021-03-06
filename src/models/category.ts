import { Type } from './enums'
export class Category {
    public constructor( public id : string, 
                        public subject : string,
                        public imageindex: number,
                        public type: Type,
                        public issystem : boolean)  //for transfers )
                        {
                            

    }
    clone( obj : Category){
        this.id = obj.id;
        this.subject = obj.subject;
        this.imageindex = obj.imageindex;
        this.issystem = obj.issystem;
        this.type = obj.type;
    }
}
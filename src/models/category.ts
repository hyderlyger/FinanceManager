import { Type } from './enums'
export class Category {
    public constructor( public id : string, 
                        public subject : string,
                        public imageindex: number,
                        public type: Type,
                        public issystem : boolean)  //for transfers )
                        {
                            

    }
}
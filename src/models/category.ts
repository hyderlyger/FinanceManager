export class Category {
    public constructor( public id : string, 
                        public subject : string,
                        public imageindex: number,
                        public type: CategoryType,
                        public issystem : boolean)  //for transfers )
                        {
                            

    }
}
export enum CategoryType {
    Revenue = 1,
    Expense
}
export enum Type {
    Revenue = 1,
    Expense,
    Transfer
}
export enum EventType{
    OpenMenuPanel = 1,
    OpenAddEditAccount,
    OpenAddEditCategory
}
export class Color {
    public constructor( public rgb : string,
                        public hex : string )
                        {
    }
}
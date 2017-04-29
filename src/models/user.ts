export class User {
    public constructor( public id : string, 
                        public name : string,
                        public email : string,
                        public dateofbirth : Date,  
                        public userid : string,
                        public password : string)   //Password Encryption Please
                        {
                            

    }
}
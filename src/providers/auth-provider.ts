import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { DBProvider } from './db-provider';
import { User } from '../models/user';

@Injectable()
export class AuthProvider {

  constructor( public dbProvider : DBProvider) { //public http: Http
    console.log('Hello AuthProvider Provider');
  }
  authenticateUser(userid : string, 
                   userpass : string){

                    return new Promise((resolve)=>
                    {
                      this.dbProvider.ValidateUser(userid,userpass).then((msg : string)=>{
                          resolve(msg);
                      });
                    });
  }

  registerUser( id : string, 
                name : string,
                email : string,
                dateofbirth : Date,  
                userid : string,
                password : string){

                  var newuser = new User(id,name,email,dateofbirth,userid,password);
                  return new Promise((resolve)=>
                  {
                    this.dbProvider.registerUser(newuser).then((msg : string)=>{
                        resolve(msg);
                    });
                  });
  } 
}
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from '@angular/http';

import { DBProvider } from './db-provider';
import { User } from '../models/user';

@Injectable()
export class AuthProvider {

  constructor( private http :  Http, public dbProvider : DBProvider) { //public http: Http
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

  getUserNameifAny(){
    return new Promise (resolve =>{
      this.dbProvider.GetUserID().then ( id => {
        if(id)
          resolve (id);
        else
          resolve("");
      });
    });
  }

  PostUserDataToURL(_name : string, _email : string, _date : string){
    let _headers = new Headers();
    _headers.append("Content-Type",'text/plain');
    let _body = "name=TESTE&dtaniv=2017-06-11&email=TESTE@TESTE.COM.BR";
    try{
      this.http.post("http://suportecont.com.br/gestor/cadastrousuario.php", _body, {headers : _headers})
      .map(res => res.json())
      .subscribe(data=>{
        console.log(data);
      });
    }catch(error){
      console.log(error);
    }
  }
}
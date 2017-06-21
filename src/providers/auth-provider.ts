import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from '@angular/http';

import { DBProvider } from './db-provider';
import { User } from '../models/user';
//date
import moment from 'moment';  //for date formating
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
    //let _body = "name="+_name+"&dtaniv="+_date+"&email="+_email;
    let formatedDate = moment(_date).format('YYYY-MM-DD');;
    let _data = "name="+_name+"&dtaniv="+formatedDate+"&email="+_email;  //testing
    try{
      this.http.get("http://suportecont.com.br/gestor/cadastrousuario.php"+"?"+_data, {headers : _headers})
      //.map(res => res.json()) //not in json
      .subscribe(data=>{
        console.log(data);
      });
    }catch(error){
      console.log(error);
    }
  }
}


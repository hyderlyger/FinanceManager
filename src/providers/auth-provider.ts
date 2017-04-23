import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  constructor() { //public http: Http
    console.log('Hello AuthProvider Provider');
  }
  authenticate(){
    return new Promise((resolve)=>
    {
      resolve(false); //false to say this guy is not already signed in
    });
  }
}
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class StringConstantsProvider {

  //Database Constants
  public db_userinfo = "UserInfo";
  public db_data = "AppData";

  //Generic Image/Icon Paths


  constructor() {
    console.log('Hello StringConstantsProvider Provider');
  }

}

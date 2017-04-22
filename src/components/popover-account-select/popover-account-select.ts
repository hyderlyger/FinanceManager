import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
  selector: 'popover-account-select',
  templateUrl: 'popover-account-select.html'
})
export class PopoverAccountSelect {

  constructor(private viewCtrl: ViewController) {
    console.log('Hello PopoverAccountSelect Component');
  }
  VisaTapped(){
      this.viewCtrl.dismiss('Visa');
  }
  CashTapped(){
      this.viewCtrl.dismiss('Cash');
  }
  AllTapped(){
      this.viewCtrl.dismiss('All');
  }
}

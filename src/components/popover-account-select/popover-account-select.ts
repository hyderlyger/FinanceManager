import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Account } from '../../models/account';

import { DBProvider } from '../../providers/db-provider';
import { ImagesProvider } from '../../providers/images-provider';

@Component({
  selector: 'popover-account-select',
  templateUrl: 'popover-account-select.html'
})
export class PopoverAccountSelect {

  constructor(private viewCtrl: ViewController, private dbprovider : DBProvider, private imagesprovider : ImagesProvider) {
    console.log('Hello PopoverAccountSelect Component');
  }
  ItemTapped(index){
      this.viewCtrl.dismiss(index);
  }
}

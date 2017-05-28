import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { RecurrenceType } from '../../models/enums';

@Component({
  selector: 'popover-recurrence-type',
  templateUrl: 'popover-recurrence-type.html'
})
export class PopoverRecurrenceType {

  _recurrenceTypes : Array<string> = ["Diário","Semanal","Mensal"];
  _recurrenceTypesPlural : Array<string> = ["dias","Semanas","Meses"];

  constructor(private viewCtrl : ViewController) {
    console.log('Hello PopoverRecurrenceType Component');
  }
  ItemTapped(type : RecurrenceType){
      this.viewCtrl.dismiss(type);
  }
}

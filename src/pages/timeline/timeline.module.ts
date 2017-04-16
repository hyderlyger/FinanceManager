import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Timeline } from './timeline';
import {AddRevenue} from '../add-revenue/add-revenue';
import {AddExpense} from '../add-expense/add-expense';


@NgModule({
  declarations: [
    Timeline,
    AddRevenue,
    AddExpense
  ],
  imports: [
    IonicPageModule.forChild(Timeline),
  ],
  exports: [
    Timeline,
    AddRevenue,
    AddExpense
  ]
})
export class TimelineModule {}

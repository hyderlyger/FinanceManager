import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Timeline } from './timeline';
import { AddRevenue} from '../add-revenue/add-revenue';
import { AddExpense} from '../add-expense/add-expense';
import { Transfer } from '../transfer/transfer'

@NgModule({
  declarations: [
    Timeline,
    AddRevenue,
    AddExpense,
    Transfer
  ],
  imports: [
    IonicPageModule.forChild(Timeline),
  ],
  exports: [
    Timeline,
    AddRevenue,
    AddExpense,
    Transfer
  ]
})
export class TimelineModule {}

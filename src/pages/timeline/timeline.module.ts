import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Timeline } from './timeline';
import { AddRevenue} from '../add-revenue/add-revenue';
import { AddExpense} from '../add-expense/add-expense';
import { Transfer } from '../transfer/transfer';

import { PopoverAccountSelect } from '../../components/popover-account-select/popover-account-select';

@NgModule({
  declarations: [
    Timeline,
    AddRevenue,
    AddExpense,
    Transfer,
    PopoverAccountSelect
  ],
  imports: [
    IonicPageModule.forChild(Timeline),
  ],
  exports: [
    Timeline,
    AddRevenue,
    AddExpense,
    Transfer,
    PopoverAccountSelect
  ]
})
export class TimelineModule {}

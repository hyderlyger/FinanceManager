import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Timeline } from './timeline';
import { AddAmountEntry } from '../add-amount-entry/add-amount-entry';
import { Transfer } from '../transfer/transfer';

import { PopoverAccountSelect } from '../../../components/popover-account-select/popover-account-select';

@NgModule({
  declarations: [
    Timeline,
    AddAmountEntry,
    Transfer,
    PopoverAccountSelect
  ],
  imports: [
    IonicPageModule.forChild(Timeline),
  ],
  exports: [
    Timeline,
    AddAmountEntry,
    Transfer,
    PopoverAccountSelect
  ]
})
export class TimelineModule {}

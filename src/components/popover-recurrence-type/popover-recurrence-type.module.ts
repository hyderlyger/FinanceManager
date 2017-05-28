import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverRecurrenceType } from './popover-recurrence-type';

@NgModule({
  declarations: [
    PopoverRecurrenceType,
  ],
  imports: [
    IonicPageModule.forChild(PopoverRecurrenceType),
  ],
  exports: [
    PopoverRecurrenceType
  ]
})
export class PopoverRecurrenceTypeModule {}

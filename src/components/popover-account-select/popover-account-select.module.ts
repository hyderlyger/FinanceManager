import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverAccountSelect } from './popover-account-select';

@NgModule({
  declarations: [
    PopoverAccountSelect,
  ],
  imports: [
    IonicPageModule.forChild(PopoverAccountSelect),
  ],
  exports: [
    PopoverAccountSelect
  ]
})
export class PopoverAccountSelectModule {}

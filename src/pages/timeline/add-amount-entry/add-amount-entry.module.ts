import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAmountEntry } from './add-amount-entry';

@NgModule({
  declarations: [
    AddAmountEntry,
  ],
  imports: [
    IonicPageModule.forChild(AddAmountEntry),
  ],
  exports: [
    AddAmountEntry
  ]
})
export class AddAmountEntryModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalRecurrence } from './modal-recurrence';

@NgModule({
  declarations: [
    ModalRecurrence,
  ],
  imports: [
    IonicPageModule.forChild(ModalRecurrence),
  ],
  exports: [
    ModalRecurrence
  ]
})
export class ModalRecurrenceModule {}

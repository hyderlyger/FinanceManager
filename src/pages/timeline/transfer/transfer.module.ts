import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Transfer } from './transfer';

@NgModule({
  declarations: [
    Transfer,
  ],
  imports: [
    IonicPageModule.forChild(Transfer),
  ],
  exports: [
    Transfer
  ]
})
export class TransferModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditAccount } from './add-edit-account';

@NgModule({
  declarations: [
    AddEditAccount,
  ],
  imports: [
    IonicPageModule.forChild(AddEditAccount),
  ],
  exports: [
    AddEditAccount
  ]
})
export class AddEditAccountModule {}

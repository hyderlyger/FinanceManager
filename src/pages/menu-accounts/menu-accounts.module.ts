import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuAccounts } from './menu-accounts';

@NgModule({
  declarations: [
    MenuAccounts,
  ],
  imports: [
    IonicPageModule.forChild(MenuAccounts),
  ],
  exports: [
    MenuAccounts
  ]
})
export class MenuAccountsModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MainMenu } from './main-menu';
import { MenuProfile } from '../menu-profile/menu-profile'
import { MenuPanel } from '../menu-panel/menu-panel'
import { MenuCategories } from '../menu-categories/menu-categories'
import { MenuAccounts } from '../menu-accounts/menu-accounts'
import { MenuSettings } from '../menu-settings/menu-settings'

@NgModule({
  declarations: [
    MainMenu,
    MenuProfile,
    MenuPanel,
    MenuCategories,
    MenuAccounts,
    MenuSettings,
  ],
  imports: [
    IonicPageModule.forChild(MainMenu),
  ],
  exports: [
    MainMenu,
    MenuProfile,
    MenuPanel,
    MenuCategories,
    MenuAccounts,
    MenuSettings,
  ]
})
export class MainMenuModule {}

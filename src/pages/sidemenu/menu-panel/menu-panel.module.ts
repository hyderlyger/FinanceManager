import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPanel } from './menu-panel';

@NgModule({
  declarations: [
    MenuPanel,
  ],
  imports: [
    IonicPageModule.forChild(MenuPanel),
  ],
  exports: [
    MenuPanel
  ]
})
export class MenuPanelModule {}

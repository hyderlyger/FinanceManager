import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainMenu } from './main-menu';

@NgModule({
  declarations: [
    MainMenu,
  ],
  imports: [
    IonicPageModule.forChild(MainMenu),
  ],
  exports: [
    MainMenu
  ]
})
export class MainMenuModule {}

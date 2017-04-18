import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuProfile } from './menu-profile';

@NgModule({
  declarations: [
    MenuProfile,
  ],
  imports: [
    IonicPageModule.forChild(MenuProfile),
  ],
  exports: [
    MenuProfile
  ]
})
export class MenuProfileModule {}

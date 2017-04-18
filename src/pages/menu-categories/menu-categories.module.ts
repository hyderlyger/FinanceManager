import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuCategories } from './menu-categories';

@NgModule({
  declarations: [
    MenuCategories,
  ],
  imports: [
    IonicPageModule.forChild(MenuCategories),
  ],
  exports: [
    MenuCategories
  ]
})
export class MenuCategoriesModule {}

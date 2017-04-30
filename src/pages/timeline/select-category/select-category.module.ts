import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCategory } from './select-category';

@NgModule({
  declarations: [
    SelectCategory,
  ],
  imports: [
    IonicPageModule.forChild(SelectCategory),
  ],
  exports: [
    SelectCategory
  ]
})
export class SelectCategoryModule {}

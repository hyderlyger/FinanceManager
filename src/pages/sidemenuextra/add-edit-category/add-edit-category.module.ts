import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditCategory } from './add-edit-category';

@NgModule({
  declarations: [
    AddEditCategory,
  ],
  imports: [
    IonicPageModule.forChild(AddEditCategory),
  ],
  exports: [
    AddEditCategory
  ]
})
export class AddEditCategoryModule {}

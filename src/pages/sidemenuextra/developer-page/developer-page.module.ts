import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeveloperPage } from './developer-page';

@NgModule({
  declarations: [
    DeveloperPage,
  ],
  imports: [
    IonicPageModule.forChild(DeveloperPage),
  ],
  exports: [
    DeveloperPage
  ]
})
export class DeveloperPageModule {}

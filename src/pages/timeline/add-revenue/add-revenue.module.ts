import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRevenue } from './add-revenue';

@NgModule({
  declarations: [
    AddRevenue,
  ],
  imports: [
    IonicPageModule.forChild(AddRevenue),
  ],
  exports: [
    AddRevenue
  ]
})
export class AddRevenueModule {}

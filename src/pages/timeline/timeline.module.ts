import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Timeline } from './timeline';
import {AddRevenue} from '../add-revenue/add-revenue';

@NgModule({
  declarations: [
    Timeline,
    AddRevenue
  ],
  imports: [
    IonicPageModule.forChild(Timeline),
  ],
  exports: [
    Timeline,
    AddRevenue
  ]
})
export class TimelineModule {}

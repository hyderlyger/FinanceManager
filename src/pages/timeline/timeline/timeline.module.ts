import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Timeline } from './timeline';

@NgModule({
  declarations: [
    Timeline
  ],
  imports: [
    IonicPageModule.forChild(Timeline),
  ],
  exports: [
    Timeline
  ]
})
export class TimelineModule {}

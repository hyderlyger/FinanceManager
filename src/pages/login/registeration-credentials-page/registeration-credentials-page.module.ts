import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Timeline } from '../../timeline/timeline/timeline';
import { RegisterationCredentialsPage } from './registeration-credentials-page';

@NgModule({
  declarations: [
    RegisterationCredentialsPage,
    Timeline
  ],
  imports: [
    IonicPageModule.forChild(RegisterationCredentialsPage),
  ],
  exports: [
    RegisterationCredentialsPage,
    Timeline
  ]
})
export class RegisterationCredentialsPageModule {}

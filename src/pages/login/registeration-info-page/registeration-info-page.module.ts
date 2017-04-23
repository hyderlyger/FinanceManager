import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterationInfoPage } from './registeration-info-page';
import { RegisterationCredentialsPage } from '../registeration-credentials-page/registeration-credentials-page';

@NgModule({
  declarations: [
    RegisterationInfoPage,
    RegisterationCredentialsPage
  ],
  imports: [
    IonicPageModule.forChild(RegisterationInfoPage),
  ],
  exports: [
    RegisterationInfoPage,
    RegisterationCredentialsPage
  ]
})
export class RegisterationInfoPageModule {}

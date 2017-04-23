import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login-page';
import { Timeline } from '../../timeline/timeline/timeline';
import { RegisterationInfoPage } from '../registeration-info-page/registeration-info-page';

@NgModule({
  declarations: [
    LoginPage,
    Timeline,
    RegisterationInfoPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  exports: [
    LoginPage,
    Timeline,
    RegisterationInfoPage
  ]
})
export class LoginPageModule {}

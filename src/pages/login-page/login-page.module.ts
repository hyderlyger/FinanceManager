import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login-page';
import { Timeline } from '../timeline/timeline';

@NgModule({
  declarations: [
    LoginPage,
    Timeline
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  exports: [
    LoginPage,
    Timeline
  ]
})
export class LoginPageModule {}

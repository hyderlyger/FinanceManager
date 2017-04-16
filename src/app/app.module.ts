import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Timeline } from '../pages/timeline/timeline';
import {AddRevenue} from '../pages/add-revenue/add-revenue';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    Timeline,
    AddRevenue
  ],
  imports: [
    BrowserModule,

    //IonicModule.forRoot(MyApp)
    IonicModule.forRoot(MyApp,{
      mode : 'ios'
    })
    //---


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Timeline,
    AddRevenue
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

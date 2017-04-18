import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { MainMenu } from '../pages/main-menu/main-menu'

import { Timeline } from '../pages/timeline/timeline';
import { AddRevenue } from '../pages/add-revenue/add-revenue';
import { AddExpense } from '../pages/add-expense/add-expense';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MainMenu,
    Timeline,
    AddRevenue,
    AddExpense
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainMenu,
    Timeline,
    AddRevenue,
    AddExpense
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

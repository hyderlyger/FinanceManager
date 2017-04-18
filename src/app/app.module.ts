import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

//Menus
import { MainMenu } from '../pages/main-menu/main-menu';
import { MenuProfile } from '../pages/menu-profile/menu-profile'
import { MenuPanel } from '../pages/menu-panel/menu-panel'
import { MenuCategories } from '../pages/menu-categories/menu-categories'
import { MenuAccounts } from '../pages/menu-accounts/menu-accounts'
import { MenuSettings } from '../pages/menu-settings/menu-settings'

//Pages
import { Timeline } from '../pages/timeline/timeline';
import { AddRevenue } from '../pages/add-revenue/add-revenue';
import { AddExpense } from '../pages/add-expense/add-expense';
import { Transfer } from '../pages/transfer/transfer'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,

    MainMenu,
    MenuProfile,
    MenuPanel,
    MenuCategories,
    MenuAccounts,
    MenuSettings,

    Timeline,
    AddRevenue,
    AddExpense,
    Transfer
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
    MenuProfile,
    MenuPanel,
    MenuCategories,
    MenuAccounts,
    MenuSettings,

    Timeline,
    AddRevenue,
    AddExpense,
    Transfer
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//Menus
import { MainMenu } from '../pages/main-menu/main-menu';
import { MenuProfile } from '../pages/menu-profile/menu-profile'
import { MenuPanel } from '../pages/menu-panel/menu-panel'
import { MenuCategories } from '../pages/menu-categories/menu-categories'
import { MenuAccounts } from '../pages/menu-accounts/menu-accounts'
import { MenuSettings } from '../pages/menu-settings/menu-settings'

//Pages
import { LoginPage } from '../pages/login-page/login-page'
import { Timeline } from '../pages/timeline/timeline';
import { AddRevenue } from '../pages/add-revenue/add-revenue';
import { AddExpense } from '../pages/add-expense/add-expense';
import { Transfer } from '../pages/transfer/transfer'

//Pipes
import { CurrencyBRL } from '../pipes/currency-brl'

//Plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

//Providers
import { AuthProvider } from '../providers/auth-provider'

//Components
import { PopoverAccountSelect } from '../components/popover-account-select/popover-account-select';

@NgModule({
  declarations: [
    MyApp,

    MainMenu,
    MenuProfile,
    MenuPanel,
    MenuCategories,
    MenuAccounts,
    MenuSettings,

    LoginPage,
    Timeline,
    AddRevenue,
    AddExpense,
    Transfer,

    CurrencyBRL,

    PopoverAccountSelect
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

    LoginPage,
    Timeline,
    AddRevenue,
    AddExpense,
    Transfer,

    PopoverAccountSelect
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
